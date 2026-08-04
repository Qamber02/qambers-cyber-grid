import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';
import { fitModelToContainer } from '@/lib/three-fit';

const PORTAL_MODEL = '/models/optimized/portal-ring.glb';
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload(PORTAL_MODEL);

function GateContent({ emissiveIntensity = 1.35 }: { emissiveIntensity?: number }) {
  const { scene } = useGLTF(PORTAL_MODEL);
  const { camera, size: viewportSize } = useThree();
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const swirlMat = useRef<THREE.ShaderMaterial>(null);

  const { modelWrapper, innerRadius } = useMemo(() => {
    const clone = scene.clone(true);
    const aspect = viewportSize.width > 0 && viewportSize.height > 0
      ? viewportSize.width / viewportSize.height
      : 1.25;

    // Apply fitModelToContainer: 78% fill ratio for clean portal framing
    const fitResult = fitModelToContainer({
      model: clone,
      camera,
      aspect,
      fillRatio: 0.78,
      objectZ: 0,
    });

    // Compute inner hole radius from single rune model geometry
    let minInnerR = Infinity;
    let maxR = 0;
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const pos = child.geometry.attributes.position;
        if (pos) {
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            if (r > maxR) maxR = r;
          }
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            if (r > 0.15 * maxR && r < minInnerR) {
              minInnerR = r;
            }
          }
        }
      }
    });

    const innerHoleWorldRadius = (minInnerR !== Infinity && minInnerR > 0)
      ? minInnerR * fitResult.scaleFactor
      : (fitResult.scaledSize.x / 2) * 0.44;

    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const original = Array.isArray(node.material) ? node.material[0] : node.material;
      const material = original ? original.clone() : new THREE.MeshStandardMaterial();
      material.emissive = new THREE.Color('#7c3aed');
      if (material.map) material.emissiveMap = material.map;
      material.emissiveIntensity = emissiveIntensity;
      material.metalness = 0.65;
      material.roughness = 0.3;
      node.material = material;
    });

    const wrapper = new THREE.Group();
    wrapper.add(clone);

    return { modelWrapper: wrapper, innerRadius: innerHoleWorldRadius };
  }, [emissiveIntensity, scene, camera, viewportSize.width, viewportSize.height]);

  useFrame((state, delta) => {
    if (swirlMat.current) {
      swirlMat.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (!group.current) return;

    const time = state.clock.elapsedTime;
    const idleFloat = Math.sin(time * 0.8) * 0.06;
    const idleSway = Math.sin(time * 0.5) * 0.05;

    const tiltX = state.pointer.y * 0.22;
    const tiltY = state.pointer.x * 0.25;
    const hoverScale = hovered ? 1.05 : 1.0;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tiltX, delta * 4);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, tiltY + idleSway, delta * 4);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, idleFloat, delta * 4);
    group.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), delta * 5);
  });

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={modelWrapper} />
      {/* Swirl Shader Mesh positioned inside inner hole */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[innerRadius * 0.86, 64]} />
        <shaderMaterial
          ref={swirlMat}
          transparent
          uniforms={{ uTime: { value: 0 } }}
          vertexShader="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }"
          fragmentShader="uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-.5; float r=length(p); float a=atan(p.y,p.x); float wave=sin(a*7.0-r*18.0-uTime*2.4)+sin(a*3.0+r*12.0+uTime); float glow=smoothstep(.65,.05,r)*(0.38+0.38*wave); vec3 core=vec3(.38,.15,.75); vec3 edge=vec3(.52,.35,.85); gl_FragColor=vec4(mix(core,edge,r*1.4)*glow, glow); }"
        />
      </mesh>
    </group>
  );
}

function PortalFallback() {
  return <div className="portal-fallback" aria-hidden="true"><span>⌬</span></div>;
}

export default function PortalScene() {
  const [webgl, setWebgl] = useState(false);
  useEffect(() => setWebgl(supportsWebGL()), []);
  if (!webgl) return <PortalFallback />;

  return (
    <Canvas
      className="portal-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 40 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#c4b5fd" />
      <pointLight color="#a78bfa" intensity={12} distance={8} position={[-2, -2, 2]} />
      <Suspense fallback={null}>
        <GateContent />
      </Suspense>
    </Canvas>
  );
}
