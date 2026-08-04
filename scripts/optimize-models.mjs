// scripts/optimize-models.mjs
// Phase 0 model compression pipeline (features.md).
// Pipeline: dedup -> prune -> weld -> simplify(gentle) -> resizeTextures(2K via sharp)
//          -> textureCompress(PNG->JPEG) -> draco(edgebreaker) -> prune.
// Quality-first per user decision (no hard 8MB cap), but payloads drop massively.
//
// Usage: node scripts/optimize-models.mjs
// Reads:  public/models/raw/*.glb
// Writes: public/models/optimized/*.glb  (overwrites)

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression, ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
import {
  dedup,
  prune,
  weld,
  textureCompress,
  draco,
} from '@gltf-transform/functions';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'public', 'models', 'raw');
const OPT_DIR = path.join(ROOT, 'public', 'models', 'optimized');

const MAX_TEX_SIZE = 2048;           // features.md: max 2K
const SIMPLIFY_RATIO = 0.5;          // keep 50% of triangles (quality-first)
const SIMPLIFY_ERROR = 0.01;         // low error target

// v4 dropped the standalone textureResize transform. Re-implement it with sharp:
// caps the largest dimension of every texture at MAX_TEX_SIZE (lanczos3).
function resizeTextures({ size }) {
  return async (doc) => {
    const logger = doc.getLogger();
    const textures = doc.getRoot().listTextures();
    for (const texture of textures) {
      const image = texture.getImage();
      if (!image) continue;
      const meta = await sharp(image).metadata();
      const largest = Math.max(meta.width || 0, meta.height || 0);
      if (largest <= size) {
        logger.debug(`resize: ${meta.width}x${meta.height} (<= ${size}, skipped)`);
        continue;
      }
      const resized = await sharp(image)
        .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true, kernel: 'lanczos3' })
        .toBuffer();
      texture.setImage(resized);
      logger.debug(`resize: ${meta.width}x${meta.height} -> capped @ ${size}`);
    }
  };
}

// Custom transform to filter out floating side debris/duplicate objects generated in raw GLBs
function cleanDebris(file) {
  return (doc) => {
    for (const mesh of doc.getRoot().listMeshes()) {
      for (const prim of mesh.listPrimitives()) {
        const posAttr = prim.getAttribute('POSITION');
        const indicesAttr = prim.getIndices();
        if (!posAttr || !indicesAttr) continue;
        const indices = indicesAttr.getArray();
        const posArray = posAttr.getArray();
        const newIndices = [];
        const triCount = indices.length / 3;

        for (let t = 0; t < triCount; t++) {
          const i0 = indices[t * 3];
          const i1 = indices[t * 3 + 1];
          const i2 = indices[t * 3 + 2];
          const avgX = (posArray[i0 * 3] + posArray[i1 * 3] + posArray[i2 * 3]) / 3;

          let keep = true;
          if (file.includes('rune-dagger')) {
            keep = avgX >= -20 && avgX <= 20;
          } else if (file.includes('portal-ring')) {
            keep = avgX >= -25 && avgX <= 25;
          } else if (file.includes('crystal-core')) {
            keep = avgX >= -50 && avgX <= -10;
          }

          if (keep) {
            newIndices.push(i0, i1, i2);
          }
        }
        const newIndicesTyped = indices.constructor === Uint32Array 
          ? new Uint32Array(newIndices) 
          : new Uint16Array(newIndices);
        indicesAttr.setArray(newIndicesTyped);
      }
    }
  };
}

async function main() {
  if (!existsSync(RAW_DIR)) {
    console.error(`[!] raw dir not found: ${RAW_DIR}`);
    process.exit(1);
  }
  await mkdir(OPT_DIR, { recursive: true });

  const dracoDecoder = await draco3d.createDecoderModule();
  const dracoEncoder = await draco3d.createEncoderModule();

  const io = new NodeIO()
    .registerExtensions([...ALL_EXTENSIONS, KHRDracoMeshCompression])
    .registerDependencies({ 'draco3d.decoder': dracoDecoder, 'draco3d.encoder': dracoEncoder });

  const files = (await readdir(RAW_DIR)).filter((f) => f.endsWith('.glb'));
  if (files.length === 0) {
    console.error('[!] no .glb files in raw/');
    process.exit(1);
  }

  let totalRaw = 0;
  let totalOpt = 0;

  for (const file of files) {
    const inPath = path.join(RAW_DIR, file);
    const outPath = path.join(OPT_DIR, file);
    const rawBytes = (await readFile(inPath)).byteLength;
    totalRaw += rawBytes;

    console.log(`\n[>] ${file}  (${(rawBytes / 1048576).toFixed(2)} MB)`);

    // NodeIO.read accepts a filesystem path directly
    const doc = await io.read(inPath);

    await doc.transform(
      // 1) housekeeping & debris filtering
      cleanDebris(file),
      dedup(),
      prune({ propertyTypes: ['NODE', 'MESH', 'MATERIAL', 'ACCESSOR', 'CAMERA', 'SKIN'] }),
      // 2) weld so draco is effective
      weld({ tolerance: 0.0001 }),
      // 3) cap textures at 2K (sharp)
      resizeTextures({ size: MAX_TEX_SIZE }),
      // 4) draco geometry compression
      draco({
        method: 'edgebreaker',
        encodeSpeed: 5,
        decodeSpeed: 5,
        quantizationBits: { POSITION: 14, NORMAL: 10, TEXCOORD: 12, COLOR: 8, GENERIC: 12 },
      }),
      // 5) final prune of orphaned data
      prune(),
    );

    const glb = await io.writeBinary(doc);
    await writeFile(outPath, glb);
    const optBytes = glb.byteLength;
    totalOpt += optBytes;

    const pct = ((1 - optBytes / rawBytes) * 100).toFixed(1);
    console.log(`    -> optimized  (${(optBytes / 1048576).toFixed(2)} MB, -${pct}%)`);
  }

  console.log('\n========================================');
  console.log(`TOTAL raw:       ${(totalRaw / 1048576).toFixed(2)} MB`);
  console.log(`TOTAL optimized: ${(totalOpt / 1048576).toFixed(2)} MB`);
  console.log(`reduction:       ${((1 - totalOpt / totalRaw) * 100).toFixed(1)}%`);
  console.log('========================================');
}

main().catch((err) => {
  console.error('[!] optimize-models failed:', err);
  process.exit(1);
});
