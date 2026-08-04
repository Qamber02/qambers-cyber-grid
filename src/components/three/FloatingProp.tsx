import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';
import { fitModelToContainer } from '@/lib/three-fit';

type PropKind = 'dagger' | 'crystal';

const modelPaths: Record<PropKind, string> = {
  dagger: '/models/optimized/rune-dagger.glb',
  crystal: '/models/optimized/crystal-core.glb',
};
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
useGLTF.preload(modelPaths.dagger);
useGLTF.preload(modelPaths.crystal);

function Model({ kind }: { kind: PropKind }) {
  const { scene } = useGLTF(modelPaths[kind]);
  const { camera, size: viewportSize } = useThree();
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  const modelWrapper = useMemo(() => {
    const clone = scene.clone(true);
    const aspect = viewportSize.width > 0 && viewportSize.height > 0
      ? viewportSize.width / viewportSize.height
      : 1.0;

    // High fill ratios for prominent visual weight: 0.94 for crystal, 0.98 for dagger
    const fillRatio = kind === 'crystal' ? 0.94 : 0.98;

    fitModelToContainer({
      model: clone,
      camera,
      aspect,
      fillRatio,
      objectZ: 0,
      fitAxis: 'height',
    });

    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const original = Array.isArray(node.material) ? node.material[0] : node.material;
      const material = original ? original.clone() : new THREE.MeshStandardMaterial();
      material.emissive = new THREE.Color('#7c3aed');
      if (material.map) material.emissiveMap = material.map;
      material.emissiveIntensity = kind === 'crystal' ? 1.1 : 0.85;
      material.metalness = 0.7;
      material.roughness = 0.25;
      node.material = material;
    });

    const wrapper = new THREE.Group();
    wrapper.add(clone);
    return wrapper;
  }, [kind, scene, camera, viewportSize.width, viewportSize.height]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const idleSpeed = kind === 'dagger' ? 0.35 : 0.28;
    const idleFloat = Math.sin(time * 1.2) * 0.04;

    const tiltX = state.pointer.y * 0.22;
    const tiltY = state.pointer.x * 0.25;
    const hoverScale = hovered ? 1.06 : 1.0;
    const initialRot = kind === 'dagger' ? [0.15, 0.35, 0.1] : [0.2, 0.5, 0.1];

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, initialRot[0] + tiltX, delta * 4);
    group.current.rotation.y += delta * idleSpeed + (tiltY * 0.02);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, idleFloat, delta * 4);
    group.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), delta * 5);
  });

  return (
    <primitive
      ref={group}
      object={modelWrapper}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

export default function FloatingProp({ kind }: { kind: PropKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setMounted(true);
    }, { rootMargin: '200px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="prop-shell" aria-hidden="true">
      {!mounted || !webgl ? (
        <div className="prop-fallback">◇</div>
      ) : (
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 4.0], fov: 40 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 4]} intensity={3.8} color="#ddd6fe" />
          <pointLight color="#7c3aed" intensity={12} position={[-2, -1, 2]} />
          <Suspense fallback={null}>
            <Model kind={kind} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
