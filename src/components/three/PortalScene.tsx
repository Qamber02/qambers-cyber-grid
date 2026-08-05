import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';
import { fitModelToContainer } from '@/lib/three-fit';
import type { Director } from '@/components/GateContext';

const PORTAL_MODEL = '/models/optimized/portal-ring.glb';
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload(PORTAL_MODEL);

interface GateContentProps {
  emissiveIntensity?: number;
  /** When provided, GSAP-driven fly-through is active (gate variant).
   *  When omitted, hero idle behaviour is pixel-identical to before. */
  director?: { current: Director };
}

export function GateContent({ emissiveIntensity = 1.35, director }: GateContentProps) {
  const { scene } = useGLTF(PORTAL_MODEL);
  const { camera, size: viewportSize } = useThree();
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const swirlMat = useRef<THREE.ShaderMaterial>(null);

  // Track initial camera Z so we can lerp back on replay
  const baseCameraZ = useRef(4.6);

  const { modelWrapper, innerRadius } = useMemo(() => {
    const clone = scene.clone(true);
    const aspect =
      viewportSize.width > 0 && viewportSize.height > 0
        ? viewportSize.width / viewportSize.height
        : 1.25;

    const fitResult = fitModelToContainer({
      model: clone,
      camera,
      aspect,
      fillRatio: 0.78,
      objectZ: 0,
    });

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
            if (r > 0.15 * maxR && r < minInnerR) minInnerR = r;
          }
        }
      }
    });

    const innerHoleWorldRadius =
      minInnerR !== Infinity && minInnerR > 0
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

    const prog = director ? director.current.progress : 0;

    if (director && prog > 0) {
      // ── Fly-through mode (gate variant) ──
      const targetZ = THREE.MathUtils.lerp(4.6, 2.0, prog);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 6);

      const targetScale = THREE.MathUtils.lerp(1.0, 1.6, prog);
      group.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6,
      );

      if (swirlMat.current) {
        swirlMat.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(1.0, 3.5, prog);
        swirlMat.current.uniforms.uDistort.value = THREE.MathUtils.lerp(0.0, 1.0, prog);
        swirlMat.current.uniforms.uZoom.value = THREE.MathUtils.lerp(1.0, 2.2, prog);
      }
    } else {
      // ── Idle mode (hero variant or gate at rest) ──
      const time = state.clock.elapsedTime;
      const idleFloat = Math.sin(time * 0.8) * 0.06;
      const idleSway = Math.sin(time * 0.5) * 0.05;

      const tiltX = state.pointer.y * 0.22;
      const tiltY = state.pointer.x * 0.25;
      const hoverScale = hovered ? 1.05 : 1.0;

      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tiltX, delta * 4);
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        tiltY + idleSway,
        delta * 4,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        idleFloat,
        delta * 4,
      );
      group.current.scale.lerp(
        new THREE.Vector3(hoverScale, hoverScale, hoverScale),
        delta * 5,
      );

      if (swirlMat.current) {
        swirlMat.current.uniforms.uSpeed.value = 1.0;
        swirlMat.current.uniforms.uDistort.value = 0.0;
        swirlMat.current.uniforms.uZoom.value = 1.0;
      }

      // Reset camera Z when prog returns to 0 (replay)
      if (camera.position.z !== baseCameraZ.current) {
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          baseCameraZ.current,
          delta * 4,
        );
      }
    }
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
          uniforms={{
            uTime:    { value: 0 },
            uSpeed:   { value: 1.0 },
            uDistort: { value: 0.0 },
            uZoom:    { value: 1.0 },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main(){
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uSpeed;
            uniform float uDistort;
            uniform float uZoom;
            varying vec2 vUv;
            void main(){
              vec2 p = vUv - 0.5;
              float r = length(p);
              float a = atan(p.y, p.x);
              // Optional radial distortion
              r += uDistort * 0.3 * sin(a * 4.0);
              float t = uTime * uSpeed;
              float wave = sin(a * 7.0 - r * 18.0 - t * 2.4) + sin(a * 3.0 + r * 12.0 + t);
              // uZoom scales glow falloff for "falling through" feel
              float glow = smoothstep(0.65, 0.05, r * uZoom) * (0.38 + 0.38 * wave);
              vec3 core = vec3(0.38, 0.15, 0.75);
              vec3 edge = vec3(0.52, 0.35, 0.85);
              gl_FragColor = vec4(mix(core, edge, r * 1.4) * glow, glow);
            }
          `}
        />
      </mesh>
    </group>
  );
}

function PortalFallback() {
  return <div className="portal-fallback" aria-hidden="true"><span>⌬</span></div>;
}

interface PortalSceneProps {
  director?: { current: Director };
  /** Controls the R3F render loop — use "never" to pre-mount without rendering */
  frameloop?: 'always' | 'demand' | 'never';
}

export default function PortalScene({ director, frameloop = 'always' }: PortalSceneProps) {
  const [webgl, setWebgl] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!webgl) return <PortalFallback />;

  return (
    <Canvas
      className="portal-canvas"
      frameloop={frameloop}
      dpr={isMobile ? [0.5, 1] : [1, 1.25]}
      camera={{ position: [0, 0, 4.6], fov: 40 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#c4b5fd" />
      <pointLight color="#a78bfa" intensity={12} distance={8} position={[-2, -2, 2]} />
      <Suspense fallback={null}>
        <GateContent director={director} />
      </Suspense>
    </Canvas>
  );
}
