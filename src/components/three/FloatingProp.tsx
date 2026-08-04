import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';

type PropKind = 'dagger' | 'crystal';

const modelPaths: Record<PropKind, string> = {
  dagger: '/models/optimized/rune-dagger.glb',
  crystal: '/models/optimized/crystal-core.glb',
};
useGLTF.setDecoderPath('/draco/');
useGLTF.preload(modelPaths.dagger);
useGLTF.preload(modelPaths.crystal);

function Model({ kind }: { kind: PropKind }) {
  const { scene } = useGLTF(modelPaths[kind]);
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

    wrapper.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const original = Array.isArray(node.material) ? node.material[0] : node.material;
      const material = original.clone();
      material.emissive = new THREE.Color('#7c3aed');
      if (material.map) material.emissiveMap = material.map;
      material.emissiveIntensity = kind === 'crystal' ? 0.7 : 0.45;
      material.metalness = 0.65;
      material.roughness = 0.3;
      node.material = material;
    });
    return wrapper;
  }, [kind, scene]);
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (kind === 'dagger' ? 0.42 : 0.28);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });
  return (
    <primitive
      ref={group}
      object={model}
      scale={kind === 'dagger' ? 2.2 : 2.4}
      rotation={kind === 'dagger' ? [0.35, 0.45, 0.4] : [0.2, 0.5, 0.1]}
    />
  );
}

export default function FloatingProp({ kind }: { kind: PropKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  useEffect(() => {
    setWebgl(supportsWebGL());
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setMounted(true); }, { rootMargin: '160px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className="prop-shell" aria-hidden="true">
    {!mounted || !webgl ? <div className="prop-fallback">◇</div> : <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 4.2], fov: 40 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      {/* Ambient light for shadow definition */}
      <ambientLight intensity={0.4} />
      {/* Key directional light for surface geometry & specular highlights */}
      <directionalLight position={[3, 4, 4]} intensity={3.2} color="#ddd6fe" />
      {/* Rim light from front-left */}
      <pointLight color="#7c3aed" intensity={8} position={[-2, -1, 2]} />
      <Suspense fallback={null}><Model kind={kind} /></Suspense>
    </Canvas>}
  </div>;
}
