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

function Model({ kind }: { kind: PropKind }) {
  const { scene } = useGLTF(modelPaths[kind]);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const material = (Array.isArray(node.material) ? node.material[0] : node.material).clone();
      material.emissive = new THREE.Color('#7c3aed');
      material.emissiveIntensity = kind === 'crystal' ? 1.25 : 0.55;
      node.material = material;
    });
    return clone;
  }, [kind, scene]);
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (kind === 'dagger' ? 0.42 : 0.28);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });
  return <primitive ref={group} object={model} scale={kind === 'dagger' ? 1.3 : 1.8} rotation={[0.1, 0.4, 0]} />;
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
      <ambientLight intensity={0.5} /><pointLight color="#a78bfa" intensity={7} position={[2, 2, 3]} />
      <Suspense fallback={null}><Model kind={kind} /></Suspense>
    </Canvas>}
  </div>;
}
