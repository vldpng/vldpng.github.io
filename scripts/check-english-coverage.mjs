import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const generatedSource = readFileSync(
  join(projectRoot, 'src', 'i18n', 'english.generated.ts'),
  'utf8',
);
const objectStart = generatedSource.indexOf('{');
const objectEnd = generatedSource.lastIndexOf('};');
const translations = JSON.parse(generatedSource.slice(objectStart, objectEnd + 1));

const files = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const normalized = path.replaceAll('\\', '/');
    if (entry.isDirectory()) {
      if (normalized.endsWith('/pages/admin') || normalized.endsWith('/server') || normalized.endsWith('/i18n')) {
        continue;
      }
      walk(path);
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(path);
    }
  }
}
walk(join(projectRoot, 'src'));

const publicStrings = new Set();
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function visit(node) {
    let value;
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isJsxText(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      value = node.text;
    }

    if (value && /[А-Яа-яЁё]/.test(value)) {
      publicStrings.add(value.replace(/\s+/g, ' ').trim());
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}

const missing = [...publicStrings].filter((value) => !translations[value]);
const untranslated = Object.entries(translations).filter(([, value]) => /[А-Яа-яЁё]/.test(value));

if (missing.length || untranslated.length) {
  if (missing.length) console.error('Missing English translations:', missing);
  if (untranslated.length) console.error('Cyrillic remains in translations:', untranslated);
  process.exit(1);
}

console.log(`English coverage: ${publicStrings.size} public strings translated.`);
