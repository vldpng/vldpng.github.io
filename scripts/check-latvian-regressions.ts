import assert from 'node:assert/strict';
import { allLatvianTranslations, translateLatvian } from '../src/i18n/latvian';
import { clinic } from '../src/data/clinic';

const CYRILLIC = /[А-Яа-яЁё]/u;
const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/u;

/**
 * Главная защита: словарь не должен вмешиваться в строки, которых в нём нет.
 *
 * Раньше translateCore добирал перевод заменой подстрок, и короткий ключ
 * «До» → «Pirms» портил каждое слово, начинающееся на эти буквы:
 * «Дополнительная консультация» превращалась в «Pirmsполнительная».
 */
for (const source of [
  'Дополнительная консультация',
  'Доступная стоимость',
  'Договор с пациентом',
  'Последующий визит',
  'Отзывы пациентов о клинике',
  'Врачи клиники RoyalDent',
  // Шаблон совпал, но имя внутри не переводится — правило обязано
  // отказаться целиком, а не выдать «Foto — Эдита Чеме».
  '[Фото — Некто Неизвестный]',
]) {
  assert.equal(
    translateLatvian(source),
    source,
    `Строка без точного перевода изменена: ${source}`,
  );
}

/** Терминология, в которой буквальный перевод был бы ошибкой. */
const cases = new Map<string, string>([
  ['Ортопедия', 'Protezēšana'],
  ['Стоматолог-ортопед', 'Zobārsts, protēzists'],
  ['Записаться на приём', 'Pieteikt vizīti'],
  ['Верхняя челюсть', 'Augšžoklis'],
  ['Нижняя челюсть', 'Apakšžoklis'],
  ['Профессиональная гигиена', 'Profesionālā mutes higiēna'],
  ['Удаление зуба мудрости', 'Gudrības zoba ekstrakcija'],
  ['Юрмале', 'Jūrmalā'],
  // Шаблонные строки собираются в рантайме и обрабатываются отдельно.
  ['Этап 3', '3. posms'],
  ['Фото 2 из 5', '2. attēls no 5'],
  ['Слайд 4', '4. slaids'],
  ['Итого: 1 480 EUR', 'Kopā: 1 480 EUR'],
  ['от 100 EUR', 'no 100 EUR'],
  ['[Фото: Виниры]', '[Foto: Venīri]'],
  ['Фото · Ортопедия', 'Foto · Protezēšana'],
  // Заголовок подставляется в шаблон уже переведённым.
  ['Cirkonija dioksīds, работа 1', 'Cirkonija dioksīds, darbs 1'],
]);

for (const [source, expected] of cases) {
  assert.equal(translateLatvian(source), expected, `Неверный перевод: ${source}`);
}

const dynamicLegalCases = new Map<string, string>([
  [
    `по телефону Клиники: ${clinic.phoneDisplay};`,
    `pa Klīnikas tālruni: ${clinic.phoneDisplay};`,
  ],
  [
    `Клиника работает по адресу: ${clinic.address.full}. График работы: ${clinic.hours.short}; ${clinic.hours.weekend}.`,
    `Klīnika atrodas adresē: ${clinic.address.full}. Darba laiks: P.–Pk.: 09.00–20.00; S.–Sv.: slēgts.`,
  ],
  [
    `Фактический адрес Клиники: ${clinic.address.full}.`,
    `Klīnikas faktiskā adrese: ${clinic.address.full}.`,
  ],
]);

for (const [source, expected] of dynamicLegalCases) {
  assert.equal(translateLatvian(source), expected, `Неверный динамический перевод: ${source}`);
}

/** Невидимые символы из макетов не должны доезжать до вёрстки. */
const zeroWidthSpace = String.fromCharCode(0x200b);
assert.equal(
  ZERO_WIDTH.test(translateLatvian(`Цены${zeroWidthSpace} на${zeroWidthSpace} услуги`)),
  false,
  'Символ нулевой ширины остался в строке',
);

for (const [source, target] of Object.entries(allLatvianTranslations)) {
  assert.equal(
    target.includes('[[['),
    false,
    `Служебная метка пакетного перевода осталась в строке: ${source}`,
  );
  assert.equal(
    CYRILLIC.test(target),
    false,
    `Кириллица в латышском переводе строки: ${source}`,
  );
  assert.ok(target.trim().length > 0, `Пустой перевод для строки: ${source}`);

  // Поиск в словаре идёт по строке со схлопнутыми пробелами, поэтому ключ
  // с лишними пробелами не совпал бы никогда и был бы мёртвым.
  assert.equal(
    source,
    source.replace(/\s+/gu, ' ').trim(),
    `Ключ словаря не нормализован по пробелам: ${JSON.stringify(source)}`,
  );
  assert.equal(translateLatvian(source), target, `Ключ не находится в словаре: ${source}`);

  // Невидимые символы приходят из макетов вместе с копипастом. На входе их
  // снимает translateCore, но значение словаря возвращается как есть —
  // поэтому «чистоту» перевода проверяем отдельно.
  assert.equal(
    ZERO_WIDTH.test(target),
    false,
    `Невидимый символ в переводе строки: ${JSON.stringify(source.slice(0, 60))}`,
  );

  // Кавычки и тире держим в одном стиле с остальным сайтом.
  assert.equal(target.includes('"'), false, `Прямые кавычки вместо «» в строке: ${source}`);
  assert.equal(
    / – /u.test(target),
    false,
    `Короткое тире вместо длинного в строке: ${source}`,
  );

  // В латышских текстах официальный термин — VDAR; GDPR остаётся только
  // в русской и английской версиях.
  assert.equal(/\bGDPR\b/u.test(target), false, `GDPR вместо VDAR в строке: ${source}`);

  /*
   * Пункт перечисления после двоеточия в русском начинается со строчной и
   * заканчивается «;». Машинный перевод такие пункты капитализировал, и на
   * странице получался капс посреди фразы. Требуем сохранять регистр —
   * кроме случаев, когда латышский пункт начинается с имени собственного.
   */
  const properNoun =
    /^(RoyalDent|Google|Vector|Ordoline|AirFlow|Air-Flow|Fläsh|Straumann|Megagen|Root|ASV|VDAR|All-on|Klīnik|Latvij|Datu valsts|Veselības inspekcij|e-veselīb|eID|E\.max|e\.max|Zumax|Carl Zeiss|Jūrmal|Rīg)/u;
  const sourceFirst = source.trimStart()[0] ?? '';
  const targetFirst = target.trimStart()[0] ?? '';
  const sourceIsListItem =
    /[а-яё]/u.test(sourceFirst) && sourceFirst === sourceFirst.toLowerCase();

  if (sourceIsListItem && !properNoun.test(target.trimStart())) {
    assert.equal(
      targetFirst,
      targetFirst.toLowerCase(),
      `Пункт списка начат с заглавной, хотя в оригинале строчная: ${JSON.stringify(source.slice(0, 60))}`,
    );
  }
}

console.log(
  `Латышские регрессии: ${cases.size + dynamicLegalCases.size + 7} прямых проверок и ${Object.keys(allLatvianTranslations).length} записей словаря пройдены.`,
);
