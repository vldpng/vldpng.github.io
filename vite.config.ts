import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

const configDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(configDir, './src'),
      },
    },
    server: {
      // Allow disabling HMR / file watching via the DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              // Артефакты сборки и архивы выкладки лежат в корне проекта и
              // весят десятки мегабайт. Следить за ними незачем: исходников
              // там нет, а пересборка их всё равно перезапишет целиком.
              // На Windows это ещё и роняло дев-сервер: watch на файле,
              // который в этот момент пишется, падает с EBUSY, а дальше
              // unhandledRejection уходил в Telegram как «сбой на сайте».
              ignored: ['**/dist/**', '**/storage/**', '**/*.zip', '**/server.cjs*'],
            },
    },
  };
});
