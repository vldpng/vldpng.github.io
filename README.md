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

`npm run build` создаёт клиент в `dist/` и серверный бандл `server.cjs`
рядом с `package.json`. Бандл лежит **вне** `dist/` намеренно: на хостинге
`dist/` назначается document root, и всё в нём качается по HTTP.

Хостинг — GarmTech, панель Plesk. Node-приложение там запускает Phusion
Passenger, а не `npm start`, поэтому раскладка каталогов задана жёстко:
document root обязан быть подкаталогом application root.

```
~/royaldent/              Application Root
├── package.json
├── server.cjs            Application Startup File
├── dist/                 Document Root — только клиент
├── storage/              база SQLite, вне веб-доступа
├── public/images/staff/  фото из админки, отдаются через Node
└── tmp/restart.txt       touch — перезапуск приложения
```

Переменные окружения задаются в Plesk (Websites & Domains → Node.js →
custom environment variables), а не файлом `.env`:

| Переменная | Значение |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | `0` — порт назначает Passenger |
| `DB_DIR` | абсолютный путь к `storage/` |
| `ADMIN_LOGIN`, `ADMIN_PASSWORD` | учётные данные админки |

Первые четыре обязательны: без `ADMIN_*` и `DB_DIR` сервер осознанно не
стартует (см. `src/server/env.ts`), иначе отказ был бы тихим — админка
пустила бы по `admin/admin`, а заявки ушли бы в базу не в том каталоге.

Зависимости на сервере — `npm ci --omit=dev`. Локально прод-сборка
запускается через `npm start` с теми же переменными.
