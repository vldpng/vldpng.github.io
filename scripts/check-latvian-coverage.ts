import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { getLanguage } from '../src/data/languages';
import { translateLatvian } from '../src/i18n/latvian';

/**
 * Покрытие латышского словаря.
 *
 * Пока в languages.ts у латышского `ready: false`, скрипт только показывает
 * прогресс и не валит сборку: перевод идёт постранично, и незаконченность —
 * это ожидаемое состояние. Как только язык объявлен готовым, любая
 * непереведённая строка становится ошибкой.
 */

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const CYRILLIC = /[А-Яа-яЁё]/u;

const files: string[] = [];
function walk(directory: string): void {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const normalized = path.replaceAll('\\', '/');
    if (entry.isDirectory()) {
      if (
        normalized.endsWith('/pages/admin') ||
        normalized.endsWith('/server') ||
        normalized.endsWith('/i18n')
      ) {
        continue;
      }
      walk(path);
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(path);
    }
  }
}
walk(join(projectRoot, 'src'));

/** Целые строки: попадают в переводчик как есть и обязаны быть в словаре. */
const staticStrings = new Set<string>();
/**
 * Куски шаблонных литералов (`Этап ${n}`). В рантайме переводчик видит уже
 * собранную строку, поэтому ключом словаря такой фрагмент быть не может —
 * для них нужны правила в translateDynamicString.
 */
const templateFragments = new Set<string>();

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const visit = (node: ts.Node): void => {
    const isFragment =
      ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
    const isWhole =
      ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node);

    if (isFragment || isWhole) {
      const value = node.text.replace(/\s+/gu, ' ').trim();
      if (value && CYRILLIC.test(value)) {
        (isFragment ? templateFragments : staticStrings).add(value);
      }
    }

    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

const missing = [...staticStrings].filter((value) => translateLatvian(value) === value);
const leftoverCyrillic = [...staticStrings]
  .filter((value) => translateLatvian(value) !== value)
  .filter((value) => CYRILLIC.test(translateLatvian(value)));
const uncoveredFragments = [...templateFragments].filter(
  (value) => translateLatvian(value) === value,
);

const translated = staticStrings.size - missing.length;
const percent = ((translated / staticStrings.size) * 100).toFixed(1);
const ready = getLanguage('lv').ready;
const listMissing = process.argv.includes('--list');

console.log(`Латышский: ${translated} из ${staticStrings.size} строк (${percent}%).`);
if (uncoveredFragments.length) {
  console.log(
    `Фрагментов шаблонных строк без динамического правила: ${uncoveredFragments.length}.`,
  );
  if (listMissing) {
    console.log(
      'Шаблонные фрагменты (проверяются регрессионными примерами):',
      JSON.stringify(uncoveredFragments.sort((a, b) => a.localeCompare(b, 'ru')), null, 2),
    );
  }
}

// Кириллица в результате перевода означает битую запись словаря — это ошибка
// всегда, независимо от готовности языка.
if (leftoverCyrillic.length) {
  console.error('Кириллица осталась в переводе:', leftoverCyrillic);
  process.exit(1);
}

if (!ready) {
  if (missing.length) {
    console.log(`Осталось перевести: ${missing.length}. Язык помечен ready: false.`);
    if (listMissing) {
      console.log(JSON.stringify(missing.sort((a, b) => a.localeCompare(b, 'ru')), null, 2));
    }
  }
  process.exit(0);
}

// Фрагменты шаблонов намеренно не валят проверку: сам по себе фрагмент
// («Фото ·») в переводчик никогда не попадает — приходит уже собранная
// строка. Что сборка переведена верно, проверяет check-latvian-regressions.
if (missing.length) {
  console.error('Нет латышского перевода:', missing);
  process.exit(1);
}
