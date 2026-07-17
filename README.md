# RoyalDent — сайт стоматологической клиники

Сайт клиники RoyalDent (Юрмала, Латвия): услуги, врачи, цены, калькулятор имплантации
и онлайн-запись на приём.

## Стек

- **Frontend:** React 19 + TypeScript, Vite 6, Tailwind CSS 4, React Router 7,
  Motion (анимации), Embla (карусели), Lucide (иконки)
- **Backend:** Express — раздача SPA и прокси онлайн-записи
  [Altegio](https://alteg.io) (токен хранится только на сервере;
  без настроенных ключей API отдаёт mock-данные, форма записи полностью тестируема)

## Запуск

```bash
npm install
npm run dev        # dev-сервер на http://localhost:3000
```

Прочие команды:

```bash
npm run build      # сборка клиента (dist/) и сервера (dist/server.cjs)
npm start          # запуск продакшен-сборки (NODE_ENV=production)
npm run lint       # проверка типов (tsc --noEmit)
npm run clean      # удалить dist/
```

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните при необходимости:

| Переменная | Назначение |
| --- | --- |
| `APP_URL` | Публичный URL сайта (абсолютные ссылки) |
| `ALTEGIO_PARTNER_TOKEN` | Partner token из маркетплейса Altegio |
| `ALTEGIO_COMPANY_ID` | ID филиала клиники в Altegio |

Пока оба ключа Altegio не заданы, `/api/booking/*` возвращает реалистичные
mock-данные — виджет записи работает без внешних сервисов.

## Структура проекта

```
server.ts               Express: SPA + /api/* (в dev — vite middleware)
src/
  server/booking.ts     Прокси Altegio (запись на приём) + mock-режим
  pages/                Страницы (роуты React Router)
  components/
    layout/             Header, Footer, Topbar
    sections/           Секции страниц (Hero, калькулятор, отзывы, …)
    modals/             Модальные окна (запись, контакты)
    ui/                 Переиспользуемые UI-компоненты
  data/                 Контент: клиника, врачи, услуги (TS-модули)
  context/              React-контексты (модалки)
public/                 Статика: изображения, иконки, шрифты
```

## Контент

Тексты и данные правятся в `src/data/*.ts` (клиника, врачи, услуги) и в
компонентах секций. Фото кладутся в `public/images/…`.

Плейсхолдеры, требующие реальных данных, помечены в коде комментарием `TODO`.

## Деплой

`npm run build` создаёт самодостаточную папку `dist/` + `dist/server.cjs`.
На сервере нужны Node.js и продакшен-зависимости (`npm ci --omit=dev`), запуск:
`NODE_ENV=production node dist/server.cjs` (порт — переменная `PORT`, по умолчанию 3000).
