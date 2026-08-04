import * as THREE from 'three';

export interface FitModelOptions {
  model: THREE.Object3D;
  camera: THREE.PerspectiveCamera | THREE.Camera;
  aspect: number;
  fillRatio?: number;
  objectZ?: number;
  fitAxis?: 'min' | 'height' | 'width' | 'max';
}

export interface FitModelResult {
  scaleFactor: number;
  worldMinSize: number;
  worldWidth: number;
  worldHeight: number;
  scaledSize: THREE.Vector3;
  frontZ: number;
  maxDimension: number;
  center: THREE.Vector3;
}

/**
 * Computes model's runtime size and scales it to fill a known ratio of its container
 * based on the camera FOV, distance, and viewport aspect ratio.
 */
export function fitModelToContainer({
  model,
  camera,
  aspect,
  fillRatio = 0.8,
  objectZ = 0,
  fitAxis = 'min',
}: FitModelOptions): FitModelResult {
  // 1. Guard aspect ratio against 0 / NaN during initial mount
  const safeAspect = aspect && !isNaN(aspect) && aspect > 0.05 ? aspect : 1.0;

  // 2. Reset transforms and center local mesh geometries at (0, 0, 0)
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);

  model.traverse((child) => {
    if (child instanceof THREE.Mesh && child.geometry) {
      child.geometry.center();
    }
  });

  model.updateMatrixWorld(true);

  // Compute accurate bounding box from centered geometries
  const box = new THREE.Box3();
  model.traverse((child) => {
    if (child instanceof THREE.Mesh && child.geometry) {
      if (!child.geometry.boundingBox) {
        child.geometry.computeBoundingBox();
      }
      if (child.geometry.boundingBox) {
        box.union(child.geometry.boundingBox);
      }
    }
  });

  if (box.isEmpty()) {
    box.setFromObject(model);
  }

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z) || 1;

  // 3. Compute camera visible frustum size in 3D world units at objectZ
  let worldHeight = 3.3488; // Default for FOV 40, distance 4.0
  let worldWidth = 3.3488 * safeAspect;

  if (camera instanceof THREE.PerspectiveCamera) {
    const distance = Math.abs(camera.position.z - objectZ);
    const fovRad = THREE.MathUtils.degToRad(camera.fov || 40);
    worldHeight = 2 * distance * Math.tan(fovRad / 2);
    worldWidth = worldHeight * safeAspect;
  }

  const worldMinSize = Math.min(worldWidth, worldHeight);

  // Target size calculation based on fitAxis parameter
  let targetSizeWorld = worldMinSize * fillRatio;
  if (fitAxis === 'height') {
    targetSizeWorld = worldHeight * fillRatio;
  } else if (fitAxis === 'width') {
    targetSizeWorld = worldWidth * fillRatio;
  } else if (fitAxis === 'max') {
    targetSizeWorld = Math.max(worldWidth, worldHeight) * fillRatio;
  }

  const scaleFactor = targetSizeWorld / maxDimension;

  // Center model geometry and apply uniform scale factor
  model.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
  model.scale.setScalar(scaleFactor);
  model.updateMatrixWorld(true);

  const scaledSize = size.clone().multiplyScalar(scaleFactor);
  const frontZ = objectZ + scaledSize.z / 2;

  return {
    scaleFactor,
    worldMinSize,
    worldWidth,
    worldHeight,
    scaledSize,
    frontZ,
    maxDimension,
    center,
  };
}
