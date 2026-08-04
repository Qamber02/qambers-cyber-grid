import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';

const PORTAL_MODEL = '/models/optimized/portal-ring.glb';
useGLTF.setDecoderPath('/draco/');
useGLTF.preload(PORTAL_MODEL);

function PortalModel({ emissiveIntensity = 1.35 }: { emissiveIntensity?: number }) {
  const { scene } = useGLTF(PORTAL_MODEL);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    
    // Compute bounding box to normalize scale and center geometry at (0,0,0)
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scaleFactor = 1 / maxDim;

    clone.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const wrapper = new THREE.Group();
    wrapper.add(clone);

    wrapper.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = Array.isArray(child.material) ? child.material[0] : child.material;
      const material = original.clone();
      material.emissive = new THREE.Color('#7c3aed');
      material.emissiveMap = material.map;
      material.emissiveIntensity = emissiveIntensity;
      material.metalness = Math.max(material.metalness, 0.55);
      material.roughness = 0.35;
      child.material = material;
    });
    return wrapper;
  }, [emissiveIntensity, scene]);

  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.16;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
  });
  return <primitive ref={group} object={model} scale={2.7} rotation={[0.05, 0, 0.2]} />;
}

function Swirl() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh position={[0, 0, 0.04]}>
      <circleGeometry args={[0.72, 64]} />
      <shaderMaterial
        ref={material}
        transparent
        uniforms={{ uTime: { value: 0 } }}
        vertexShader="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }"
        fragmentShader="uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-.5; float r=length(p); float a=atan(p.y,p.x); float wave=sin(a*7.0-r*18.0-uTime*2.4)+sin(a*3.0+r*12.0+uTime); float glow=smoothstep(.62,.04,r)*(0.52+0.48*wave); vec3 core=vec3(.486,.227,.93); vec3 edge=vec3(.655,.545,.98); gl_FragColor=vec4(mix(core,edge,r*1.5)*glow, glow); }"
      />
    </mesh>
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
    <Canvas className="portal-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 4.6], fov: 40 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#000000']} />
      {/* Ambient in 0.3-0.4 range to preserve shadows & dark Solo Leveling aesthetic */}
      <ambientLight intensity={0.35} />
      {/* Directional Key Light to reveal surface geometry & specular highlights */}
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#c4b5fd" />
      {/* Rim Light from behind to catch metallic edges */}
      <pointLight color="#a78bfa" intensity={12} distance={8} position={[-2, -2, 2]} />
      <Suspense fallback={null}>
        <PortalModel />
        <Swirl />
      </Suspense>
    </Canvas>
  );
}
