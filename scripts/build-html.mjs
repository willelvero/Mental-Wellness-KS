// Assembles static HTML pages from src/ + partials/.
// Each src/<path>.html becomes <path>/index.html at the repo root
// (src/index.html stays index.html). Partials are injected via
// <!-- include:name --> markers; {{base}} resolves to the relative
// path prefix back to the repo root so the same markup works at any depth.
// {{home}} resolves to the homepage path so nav anchors work everywhere.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { minify as minifyHtml } from 'html-minifier-terser';

const SRC = 'src';
const PARTIALS = 'partials';

// HTML minification settings — conservative defaults. Preserves
// <!-- TODO before launch --> markers and any IE-style conditional
// comments; collapses whitespace and strips redundant attributes.
const MINIFY_OPTS = {
  collapseWhitespace: true,
  conservativeCollapse: true,        // keep at least one space between tags
  removeComments: true,
  ignoreCustomComments: [
    /^\s*TODO/i,                     // preserve <!-- TODO before launch --> notes
    /^\s*include:/i,                 // safety: should never reach minifier, but keep if it does
    /^!/,                            // <!--! ... --> style "important" comments
    /^\[if\s/i,                      // IE conditionals
  ],
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,                   // inline <style> blocks (e.g. JSON-LD-adjacent CSS)
  minifyJS: true,                    // inline <script> blocks (excluding JSON-LD)
  decodeEntities: false,             // keep entities like &amp; intact in copy
  sortAttributes: false,             // avoid pointless diff churn
  sortClassName: false,
};

const partials = {};
for (const file of readdirSync(PARTIALS)) {
  if (file.endsWith('.html')) {
    partials[file.replace(/\.html$/, '')] = readFileSync(join(PARTIALS, file), 'utf8');
  }
}

function findHtml(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(findHtml(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const sources = findHtml(SRC);
if (!sources.length) {
  console.log('build:html — no source files in src/');
  process.exit(0);
}

let bytesIn = 0;
let bytesOut = 0;

for (const srcFile of sources) {
  const rel = relative(SRC, srcFile);
  // Files prefixed with _ are templates, not real pages — skip them.
  if (rel.split('/').some(seg => seg.startsWith('_'))) {
    console.log(`build:html — skipping template ${srcFile}`);
    continue;
  }

  const outPath = rel === 'index.html'
    ? 'index.html'
    : rel.replace(/\.html$/, '/index.html');

  const depth = outPath.split('/').length - 1;
  const base = '../'.repeat(depth);
  const home = depth === 0 ? '' : base + 'index.html';

  let html = readFileSync(srcFile, 'utf8');
  html = html.replace(/<!--\s*include:([\w-]+)\s*-->/g, (_, name) => {
    if (!(name in partials)) {
      throw new Error(`build:html — unknown partial "${name}" in ${srcFile}`);
    }
    return partials[name];
  });
  html = html.split('{{home}}').join(home);
  html = html.split('{{base}}').join(base);

  const sizeIn = Buffer.byteLength(html, 'utf8');
  const minified = await minifyHtml(html, MINIFY_OPTS);
  const sizeOut = Buffer.byteLength(minified, 'utf8');
  bytesIn += sizeIn;
  bytesOut += sizeOut;

  mkdirSync(dirname(outPath) || '.', { recursive: true });
  writeFileSync(outPath, minified);
  const pct = ((1 - sizeOut / sizeIn) * 100).toFixed(1);
  console.log(`build:html — ${srcFile} -> ${outPath}  (${sizeIn} → ${sizeOut}, -${pct}%)`);
}

const totalPct = bytesIn ? ((1 - bytesOut / bytesIn) * 100).toFixed(1) : '0.0';
console.log(`build:html — minified ${(bytesIn / 1024).toFixed(1)} KB → ${(bytesOut / 1024).toFixed(1)} KB (-${totalPct}%)`);
