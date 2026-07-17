# RoyalDent — Design System

Дизайн-система сайта стоматологической клиники **RoyalDent** (Юрмала).
Источник истины — [`src/index.css`](src/index.css) (токены, типографика, утилиты) и Tailwind CSS v4.

> ⚠️ **Важно понимать с самого начала.** В проекте переопределены стандартные палитры Tailwind:
> - класс **`zinc-*` — это НЕ серый Tailwind, а брендовая нейтраль «сейдж → графит»** (тёплый серо-зелёный с графитовым текстом);
> - класс **`amber-*` — это НЕ янтарный, а брендовая терракота** (`#B05A36`).
>
> То есть `bg-zinc-950` даёт графит-чёрный `#2A2B2F`, а `bg-amber-500` — фирменную терракоту.
> Это сделано осознанно: можно пользоваться привычными Tailwind-классами, но получать фирменные цвета.
>
> Дополнительно введён нестандартный токен **`--color-card` (`#F5EEE1`)** — тёплый кремовый фон карточек
> (используется как `bg-card`, `text-card-foreground` заменяет прежний белый).

---

## 1. Цвета (Color System)

### 1.1. Брендовый акцент — Терракота (`amber-*`)

Основной цвет действия: кнопки, ссылки при наведении, активные состояния, фокус, выделение текста.

| Токен | HEX | Назначение |
|---|---|---|
| `amber-50`  | `#f9eee6` | Фон акцентных плашек (light) |
| `amber-100` | `#f1d8c9` | |
| `amber-200` | `#e5bba3` | Мягкие «свечения»/блобы (`bg-amber-200/40`) |
| `amber-300` | `#d6997b` | |
| `amber-400` | `#c57854` | Акцентный текст на тёмном (`text-amber-400`) |
| **`amber-500`** | **`#B05A36`** | **Primary — главная терракота** |
| `amber-600` | `#9a4c2d` | Hover основной кнопки |
| `amber-700` | `#7e3e25` | Акцентный текст на светлом (`text-amber-700`) |
| `amber-800` | `#63311e` | |
| `amber-900` | `#4e2818` | |
| `amber-950` | `#2c1409` | |

### 1.2. Нейтральная шкала — «Сейдж → Графит» (`zinc-*`)

Фоны, текст, границы. Тёплый кремовый и серо-зелёный (сейдж) для фонов, единый графит `#3A3A3A` для текста.
Обратите внимание: **несколько токенов намеренно совпадают** (600/700/900 = один графит) — это упрощает работу с текстом.

| Токен | HEX | Назначение |
|---|---|---|
| `zinc-50`  | `#FEF9EF` | Фон страниц — тёплый кремовый |
| `zinc-100` | `#ebece9` | Границы, фоны плашек/чипов |
| `zinc-200` | `#dcdedb` | Границы инпутов, разделители, hover-фон чипов |
| `zinc-300` | `#c3c6c0` | Иконки-подсказки, скроллбар |
| `zinc-400` | `#9ba097` | Приглушённый текст, плейсхолдеры |
| `zinc-500` | `#6f756b` | Второстепенный текст (сейдж-серый) |
| `zinc-600` | `#3A3A3A` | Основной текст — графит |
| `zinc-700` | `#3A3A3A` | Текст — графит (= 600) |
| `zinc-800` | `#3a3b40` | Тёмные UI-элементы на тёмных панелях, границы на тёмном |
| `zinc-900` | `#3A3A3A` | Заголовки — графит (= 600/700) |
| `zinc-950` | `#2A2B2F` | Тёмные секции (врачи, футер, модалки) — графит-чёрный |

### 1.3. База и специальные токены

| Токен | HEX | Назначение |
|---|---|---|
| `--color-card` | `#F5EEE1` | **Фон карточек/блоков** (тёплый кремовый, заменяет белый). Класс `bg-card` |
| `white` | `#ffffff` | Полупрозрачные слои навигации (`bg-white/20`, `backdrop-blur`) |
| `black` | `#000000` | Фон фото-плейсхолдеров (`BlackPlaceholder`) |

### 1.4. Семантика использования

- **Primary action** → `bg-amber-500` + `text-white`, hover `bg-amber-600` (обычно вместе с утилитой `.btn-sweep`, см. §5.1).
- **Тёмные секции** (врачи, модалки, футер) → `bg-zinc-950` / `bg-zinc-900` + `text-white`.
- **Светлые секции** → `bg-zinc-50` + `text-zinc-900` (заголовки) / `text-zinc-500`–`600` (текст).
- **Карточки/блоки** → `bg-card` (кремовый) вместо белого.
- **Выделение текста (`::selection`)** → терракота с прозрачностью `rgba(254,129,60,0.22)`, цвет текста `#3A3A3A`.
- **Фокус (`:focus-visible`)** → двойное кольцо через `box-shadow`: `2px` фон (`zinc-50`) + `4px amber-500`, радиус `8px`. У полей ввода кольцо снято — фокус показывается сменой границы.

---

## 2. Тёмная тема (Dark Mode)

- Реализована **через класс** (`@custom-variant dark (&:is(.dark *))`), не через системную медиа-фичу.
- Включается классом `.dark` на родителе; в разметке используется через варианты `dark:` (например, `bg-card dark:bg-zinc-900`, `text-zinc-900 dark:text-zinc-100`).
- Типовая пара: светлый фон `zinc-50` ↔ тёмный `zinc-950`; текст `zinc-900` ↔ `zinc-100`.
- Активно применяется в навигации, полях ввода, карточках (~30+ компонентов).

---

## 3. Типографика (Typography)

### 3.1. Шрифт

- **Семейство:** системный стек Tailwind `font-sans` (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, …`).
  Кастомный веб-шрифт не подключён — ставка на нативные системные шрифты (быстро, без FOUT).
- **Сглаживание:** `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.

### 3.2. Типографическая шкала

Кастомные классы из [`src/index.css`](src/index.css) (`@layer components`). Классы задают **только размер, насыщенность, трекинг и интерлиньяж** — цвет указывается отдельно в месте использования (чтобы работать и на светлых, и на тёмных секциях).

| Класс | Роль | Размеры (mobile → desktop) | Вес / трекинг / интерлиньяж |
|---|---|---|---|
| `.eyebrow`   | Надзаголовок-метка (КАПСОМ над H2) | `text-xs` | `font-semibold`, `uppercase`, `tracking-[0.2em]` |
| `.h-display` | Главный заголовок / Hero (h1) | `text-4xl → md:5xl → lg:6xl` | `font-bold`, `tracking-tight`, `leading-[1.08]` |
| `.h-section` | Заголовок секции (h2) | `text-3xl → md:4xl → lg:5xl` | `font-medium`, `tracking-tight`, `leading-[1.12]` |
| `.h-card`    | Заголовок карточки (h3) | `text-xl → md:2xl` | `font-medium`, `tracking-tight`, `leading-snug` |
| `.text-lead` | Вводный абзац под заголовком | `text-lg → md:xl` | `leading-relaxed` |
| `.text-body` | Основной текст | `text-base` | `leading-relaxed` |

**Принцип:** заголовки — `tracking-tight` (плотный трекинг) и средний/жирный вес; метки `.eyebrow` — наоборот, широкая разрядка `0.2em` капсом. Это создаёт фирменный контраст «плотный заголовок ↔ разрежённая метка».

---

## 4. Геометрия и пространство (Layout & Spacing)

### 4.1. Контейнер и сетка

- **Ширина контейнера снята:** токен `--container-7xl: none` — блоки занимают **всю ширину экрана** (центрирующего `mx-auto` эффекта у `max-w-7xl` больше нет), боковой воздух даёт только `padding` (`px-4 md:px-8`).
- **Узкие читаемые колонки** используют собственные `max-w-6xl` / `max-w-[1000px]` и т.п.
- **Вертикальный ритм секций:** `py-24` (крупные паузы между блоками).
- **Якоря под фикс-шапку:** `scroll-mt-24`.

### 4.2. Скругления (Border Radius)

| Значение | Где применяется |
|---|---|
| `rounded-full` | Кнопки, пилюли-чипы, иконочные кнопки навигации, аватары |
| `rounded-[2rem]` / `rounded-3xl` | Карточки (услуги, врачи), модальные окна |
| `rounded-2xl` | Внутренние блоки карточек, опции выбора |
| `rounded-xl` | Инпуты, мелкие плашки, иконки-контейнеры |

### 4.3. Тени (Shadows)

- `shadow-sm` — карточки в покое.
- `shadow-md` → hover `shadow-lg` — кнопки.
- `shadow-[0_4px_20px_rgba(0,0,0,0.05)]` — мягкая тень навигационных стрелок каруселей.
- `shadow-2xl` — модальные окна, раскрытые меню навигации.

---

## 5. Компоненты (паттерны)

### 5.1. Кнопки

**Primary (главное действие — «Записаться на приём»)** — с фирменной анимацией `.btn-sweep`:
```html
btn-sweep bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full
text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95
```

> **`.btn-sweep`** (см. `src/index.css`) — при наведении/фокусе тёмная заливка `#2A2B2F` «выезжает» слева направо под наклоном (`skewX(-22deg)`, `cubic-bezier(0.4,0,0.2,1)`, 0.45s). Псевдоэлемент `::after` рисуется под текстом (`z-index:-1`). Уважает `prefers-reduced-motion: reduce` (анимация отключается).

**Кнопка на тёмном фоне (кремовая пилюля)**
```html
bg-card text-zinc-900 px-6 py-2.5 rounded-full text-xs font-semibold
hover:bg-zinc-200 transition-colors
```

**Иконочная (стрелки каруселей, на тёмной секции)**
```html
h-12 w-12 rounded-full border border-zinc-700 text-white
flex items-center justify-center transition-colors
hover:bg-card hover:text-zinc-900
disabled:opacity-30 disabled:cursor-not-allowed
```

### 5.2. Чипы / теги

```html
inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold
bg-zinc-100 text-zinc-800        /* нейтральный */
bg-amber-500 text-white          /* акцентный */

/* «пилюля-метка» на hero — обводка + мягкий фон терракоты */
rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5
text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400
```

### 5.3. Карточка

```html
bg-card dark:bg-zinc-900 rounded-[2rem] p-8 shadow-sm
border border-zinc-100 dark:border-zinc-800
```

### 5.4. Поля ввода

```html
w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2
text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors
```
Подпись поля: `text-xs font-semibold text-zinc-500`; обязательность — `<span class="text-amber-500">*</span>`.

### 5.5. Модальные окна

Двухпанельные: тёмная инфо-панель (`bg-zinc-950 text-white`) + светлая форма (`bg-card dark:bg-zinc-900`), общий контейнер `rounded-[2rem] p-3 shadow-2xl`, оверлей `bg-black/60 backdrop-blur-sm`. Анимация появления — `motion/react` (spring, scale 0.95→1, y 20→0).

### 5.6. Навигация

Полупрозрачные «стеклянные» пилюли: `bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10` (light) ↔ `dark:bg-zinc-800/50 … dark:border-zinc-700/30`. Раскрытые меню — `bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl rounded-3xl`.

---

## 6. Иконография

- **Основной набор:** [`lucide-react`](https://lucide.dev) (stroke-иконки, `stroke-width: 2`), типовые размеры `14 / 16 / 18 / 20 / 24 / 28`.
- **Кастомные SVG:** через компонент [`MaskIcon`](src/components/ui/MaskIcon.tsx) (CSS `mask-image`) — иконка перекрашивается в `currentColor`. Используется для категорий услуг (`/icons/*.svg`).

---

## 7. Движение (Motion)

- Библиотека: `motion/react` (Framer Motion).
- Появление контента: `FadeIn` ([`src/components/ui/fade-in.tsx`](src/components/ui/fade-in.tsx)) с задержками `delay` для каскада.
- Переходы по умолчанию: `transition-colors` / `transition-all`, длительности `duration-300 / 500`, easing `ease-out`.
- Микро-интеракции кнопок: `active:scale-95` + sweep-заливка (`.btn-sweep`).
- Карусели: `embla-carousel-react`, прокрутка с `snap-x snap-mandatory`.
- Слайдер «до/после»: [`before-after-slider.tsx`](src/components/ui/before-after-slider.tsx) с кремовой рукояткой (`bg-card`).

---

## 8. Прочие детали

- **Скроллбар:** тонкий (`10px`), `thumb` цвета `zinc-300` (hover `zinc-400`), скрывается в каруселях утилитой `.hide-scrollbar`.
- **Плавная прокрутка:** `scroll-behavior: smooth` на `html`.
- **Плейсхолдеры фото:** чёрный фон (`bg-black`) с подписью капсом `text-zinc-800` — компонент [`BlackPlaceholder`](src/components/ui/Placeholder.tsx).
- **theme-color (браузер):** задаётся в `index.html` `<meta>`.

---

## 9. Шпаргалка по токенам

```
ТЕРРАКОТА (action):   amber-500  #B05A36   hover → amber-600 #9a4c2d
ФОН СВЕТЛЫЙ:          zinc-50    #FEF9EF   (тёплый кремовый)
ФОН КАРТОЧЕК:         card       #F5EEE1   (bg-card)
ФОН ТЁМНЫЙ:           zinc-950   #2A2B2F   (графит-чёрный)
ТЕКСТ (заголовок):    zinc-900   #3A3A3A   (light) / white (dark)
ТЕКСТ (body):         zinc-500/600 #6f756b–#3A3A3A (light) / zinc-300/400 (dark)
ГРАНИЦЫ:              zinc-100/200 (light) / zinc-800 (dark)

Заголовок секции:     .h-section   (3xl→5xl, medium, tracking-tight)
Метка над ним:        .eyebrow     (xs, semibold, uppercase, 0.2em)
Кнопка:               .btn-sweep, rounded-full, amber-500, active:scale-95
Карточка:             bg-card, rounded-[2rem], shadow-sm, border zinc-100
Контейнер:            во всю ширину (--container-7xl: none), px-4 md:px-8, секции py-24
```
