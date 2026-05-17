// One-shot image optimizer. Run with: node scripts/optimize-images.mjs
// Backs originals up to images-original/ then rewrites in place.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const imgDir = path.join(root, 'images');
const backupDir = path.join(root, 'images-original');

function backup(rel) {
  const src = path.join(imgDir, rel);
  const dst = path.join(backupDir, rel);
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

async function reencodeWebp(rel, { width, quality }) {
  const file = path.join(imgDir, rel);
  if (!fs.existsSync(file)) { console.log('  skip (missing):', rel); return; }
  backup(rel);
  const before = fs.statSync(file).size;
  const buf = await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  fs.writeFileSync(file, buf);
  const after = fs.statSync(file).size;
  console.log(`  ${rel.padEnd(45)} ${(before/1024).toFixed(0).padStart(6)} KB → ${(after/1024).toFixed(0).padStart(5)} KB`);
}

async function extractLogo() {
  const svgFile = path.join(imgDir, 'logo.svg');
  if (!fs.existsSync(svgFile)) { console.log('  skip logo (missing)'); return; }
  backup('logo.svg');
  const svg = fs.readFileSync(svgFile, 'utf8');
  const match = svg.match(/href="data:image\/png;base64,([^"]+)"/);
  if (!match) { console.log('  logo.svg has no embedded raster — leaving alone'); return; }
  const pngBuf = Buffer.from(match[1], 'base64');
  const before = fs.statSync(svgFile).size;
  const webpBuf = await sharp(pngBuf)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toBuffer();
  const webpPath = path.join(imgDir, 'logo.webp');
  fs.writeFileSync(webpPath, webpBuf);
  // Replace the SVG embedded base64 with the new compressed payload so logo.svg also shrinks.
  const newB64 = webpBuf.toString('base64');
  const newSvg = svg.replace(/href="data:image\/png;base64,[^"]+"/, `href="data:image/webp;base64,${newB64}"`);
  fs.writeFileSync(svgFile, newSvg);
  const after = fs.statSync(svgFile).size;
  console.log(`  logo.svg (embedded raster swapped to webp)   ${(before/1024).toFixed(0).padStart(6)} KB → ${(after/1024).toFixed(0).padStart(5)} KB`);
  console.log(`  logo.webp (new standalone file)              ${(webpBuf.length/1024).toFixed(0).padStart(11)} KB`);
}

console.log('Hero:');
await reencodeWebp('hero.webp', { width: 1920, quality: 72 });
await reencodeWebp('hero-banner.webp', { width: 1200, quality: 72 });

console.log('Programs:');
for (const f of ['php.webp', 'iop.webp', 'veteran-services.webp']) {
  await reencodeWebp(`programs/${f}`, { width: 1200, quality: 75 });
}

console.log('Team (carousel — biggest savings here):');
for (const f of ['ken-seeley-1.webp','ken-seeley-2.webp','ken-seeley-3.webp','ken-seeley-4.webp','ken-seeley-5.webp']) {
  await reencodeWebp(`team/${f}`, { width: 800, quality: 78 });
}

console.log('Insurance logos:');
for (const f of fs.readdirSync(path.join(imgDir, 'insurance'))) {
  await reencodeWebp(`insurance/${f}`, { width: 320, quality: 82 });
}

console.log('Logo:');
await extractLogo();

console.log('\nDone. Originals saved to images-original/');
