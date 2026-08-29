import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const projectRoot = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/(.:)/, '$1')), '..');
const srcRoot = join(projectRoot, 'src');

const entries = process.argv.slice(2);
if (entries.length === 0) {
  console.error('Usage: node scripts/extract-page-strings.mjs <src entry> [...]');
  process.exit(1);
}

const visited = new Set();
const strings = new Set();

function resolveImport(fromFile, specifier) {
  const base = specifier.startsWith('@/')
    ? join(srcRoot, specifier.slice(2))
    : specifier.startsWith('.')
      ? resolve(dirname(fromFile), specifier)
      : null;
  if (!base) return null;

  const candidates = extname(base)
    ? [base]
    : [`${base}.ts`, `${base}.tsx`, join(base, 'index.ts'), join(base, 'index.tsx')];
  return candidates.find((candidate) => {
    try {
      readFileSync(candidate);
      return true;
    } catch {
      return false;
    }
  }) ?? null;
}

function visitFile(file) {
  const normalized = normalize(file);
  if (visited.has(normalized) || normalized.includes(`${join('src', 'i18n')}`)) return;
  visited.add(normalized);

  const source = readFileSync(normalized, 'utf8');
  const sourceFile = ts.createSourceFile(
    normalized,
    source,
    ts.ScriptTarget.Latest,
    true,
    normalized.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const imported = resolveImport(normalized, node.moduleSpecifier.text);
      if (imported) visitFile(imported);
    }

    let value;
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isJsxText(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      value = node.text.replace(/\s+/g, ' ').trim();
    }
    if (value && /[А-Яа-яЁё]/u.test(value)) strings.add(value);

    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}

for (const entry of entries) visitFile(resolve(projectRoot, entry));

console.log(JSON.stringify([...strings].sort((a, b) => a.localeCompare(b, 'ru')), null, 2));
console.error(`${visited.size} modules, ${strings.size} Cyrillic strings.`);
