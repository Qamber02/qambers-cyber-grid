import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

const CyberGrid = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Respect prefers-reduced-motion — skip the animation loop entirely
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap at DPR 2 — prevents 4× render cost on 4K displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Grid — matching the cyan brand palette
    const gridHelper = new THREE.GridHelper(100, 50, 0x003a5c, 0x001a2e);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2040, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f5ff, 0.8, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4fc3f7, 0.8, 50);
    pointLight2.position.set(-10, 10, -10);
    scene.add(pointLight2);

    // Animation — skipped if user prefers reduced motion
    let animationFrameId: number;

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0004;
        camera.position.z = 10 + Math.sin(Date.now() * 0.0001) * 1.5;
        renderer.render(scene, camera);
      };
      animate();

      // Pause loop when tab is backgrounded, resume when visible again
      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(animationFrameId);
        } else {
          animate();
        }
      };
      document.addEventListener('visibilitychange', onVisibility);

      // Store for cleanup
      (renderer as unknown as { _visibilityCleanup: () => void })._visibilityCleanup = () =>
        document.removeEventListener('visibilitychange', onVisibility);
    }

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      (renderer as unknown as { _visibilityCleanup?: () => void })._visibilityCleanup?.();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[0] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default memo(CyberGrid);
