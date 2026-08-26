/**
 * Сборка серверного бандла для продакшена.
 *
 * Вынесено из package.json, а не оставлено строкой в "build", из-за баннера
 * ниже: в нём есть кавычки, а экранировать их для cmd.exe и для sh нужно
 * по-разному — на одной из платформ сборка молча выдавала бы битый файл.
 *
 * Зачем баннер. Исходники — ESM и вычисляют свой каталог через
 * import.meta.url. В CJS-выводе esbuild заменяет import.meta на пустой
 * объект, поэтому import.meta.url становится undefined, и приложение
 * падает на первой же строке. Подставляем эквивалент, собранный из
 * __filename, который в CJS есть всегда.
 *
 * Почему бандл лежит рядом с package.json, а не в dist/: под Plesk каталог
 * dist/ назначается document root, и всё, что в нём лежит, качается по
 * HTTP — включая серверный код и его sourcemap.
 */
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

await build({
  entryPoints: [join(root, 'server.ts')],
  outfile: join(root, 'server.cjs'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  // Зависимости ставятся на сервере через npm ci --omit=dev.
  packages: 'external',
  // Sourcemap безопасен: файл вне document root. Читается при запуске
  // с --enable-source-maps (см. npm start), иначе стек будет по бандлу.
  sourcemap: true,
  define: { 'import.meta.url': '_importMetaUrl' },
  banner: { js: 'const _importMetaUrl = require("url").pathToFileURL(__filename).href;' },
});

console.log('server.cjs собран');
