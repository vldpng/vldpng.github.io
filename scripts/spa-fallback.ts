/**
 * Заглушки для статического хостинга (GitHub Pages) после vite build.
 *
 * Pages отдаёт файлы с диска: если запрошенного пути нет, возвращается
 * 404.html — со статусом 404, даже когда SPA рисует нормальную страницу.
 * Для людей выглядит прилично, для поисковика — «страницы не существует».
 *
 * Поэтому кладём настоящий index.html в каталог каждого языка: корень
 * языковой версии начинает отвечать честным 200. Вложенные маршруты
 * (/ru/about и глубже) по-прежнему уходят в 404.html — на статике это
 * не лечится, полностью решится на GarmTech, где отвечает Node.
 *
 * Список языков берётся из data/languages.ts, так что появление новой
 * версии не потребует правок ни здесь, ни в workflow.
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { LANGUAGES } from '../src/data/languages';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const index = join(dist, 'index.html');

// SPA-фолбэк для всего остального.
copyFileSync(index, join(dist, '404.html'));

const created: string[] = [];
for (const lang of LANGUAGES) {
  // Язык без префикса живёт в корне, там index.html уже есть.
  // Непереведённые пропускаем: отдавать их страницы незачем.
  if (!lang.prefix || !lang.ready) continue;
  const dir = join(dist, lang.prefix.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, 'index.html'));
  created.push(`${lang.prefix}/`);
}

console.log(
  `spa-fallback: 404.html + ${created.length ? created.join(', ') : 'языковых каталогов нет'}`,
);
