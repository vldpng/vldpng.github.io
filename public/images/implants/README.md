# Изображения для калькулятора имплантации

Структура папки:

```
implants/
  jaw.svg              — интерактивная схема челюстей (зубы = отдельные пути)
  root.webp            — фото импланта ROOT®
  megagen.webp         — фото импланта Megagen
  straumann.webp       — фото импланта Straumann
  brands/              — логотипы брендов имплантов
    roott.png
    megagen.svg
    straumann.svg
  crowns/              — фото коронок
    metal.webp         — металлическая
    metalceramic.webp  — металлокерамическая
    zirconium.webp     — циркониевая
```

Рекомендации для фото имплантов (`*.webp` в корне):
- прозрачный фон (alpha), вертикальная ориентация;
- примерно 400×800 px (соотношение ~1:2), вес — десятки КБ;
- одинаковый ракурс и кадрирование у всех трёх.

Пока фото импланта нет, калькулятор показывает векторную заглушку (`ImplantGlyph`).

Связано: [PriceCalculator.tsx](../../../src/components/sections/PriceCalculator.tsx)
