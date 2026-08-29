import assert from 'node:assert/strict';
import { translateEnglish } from '../src/i18n/english';
import { generatedEnglishTranslations } from '../src/i18n/english.generated';

const cases = new Map<string, string>([
  [
    'Сертификат 1 из 3 — Виталий Двуреченский',
    'Certificate 1 of 3 — Vitaly Dvurechensky',
  ],
  ['Коронка «Металлокерамическая коронка»', 'Crown: Metal-ceramic crown'],
  ['До', 'Before'],
  ['После', 'After'],
  ['Отправляем…', 'Sending…'],
  ['зуб', 'tooth'],
  ['зуба', 'teeth'],
  ['зубов', 'teeth'],
  ['Ортопедия', 'Prosthodontics'],
  ['Стаж работы', 'Work experience'],
  ['Этапы имплантации', 'Implantation stages'],
  ['Лёгкая или умеренная атрофия костной ткани', 'Mild to moderate bone tissue atrophy'],
  ['Удерживающая капа после лечения на элайнерах', 'Retainer after aligner treatment'],
  [
    'От 21 до 22 часов. Снимать капы нужно только на время еды и чистки зубов. Если носить их меньше, лечение затягивается, а результат становится непредсказуемым.',
    '21–22 hours a day. Remove the aligners only for eating and brushing. Wearing them for less time can prolong treatment and make the result unpredictable.',
  ],
]);

for (const [source, expected] of cases) {
  assert.equal(translateEnglish(source), expected, `Incorrect translation for: ${source}`);
}

for (const value of [
  'in the area of \u200B\u200B1 tooth',
  'What languages \u200B\u200Bdo your specialists speak?',
]) {
  assert.equal(/[\u200B-\u200D\uFEFF]/u.test(translateEnglish(value)), false, 'Zero-width character remains');
}

assert.equal(
  /[Вв]анд|таланд|чинсканд/u.test(
    translateEnglish('Сертификат 1 из 3 — Виталий Двуреченский'),
  ),
  false,
  'A short dictionary key corrupted a name',
);

const forbiddenOutput = [
  /Organization of the Root Canal System/i,
  /From 9 to 10 PM/i,
  /orthodontists, orthodontists/i,
  /Implant surgeon, orthodontist/i,
  /an orthopedic surgeon/i,
  /bone atrophy Fabrics/i,
  /children for over 15 years Smiles/i,
  /Experience Works/i,
  /Stages Implantation/i,
  /Price list Clinics/i,
  /Reviews Google Maps/i,
  /official website Clinics/i,
  /longevity of pregnancy/i,
  /further tooth atrophy/i,
  /with the device Vector/i,
  /Retaining cap/i,
  /\bOrthopedics\b/i,
  /In the field of healthcare/i,
  /Schedule an initial and follow-up appointment An appointment/i,
  /a scan was performed/i,
  /Hardware gum treatment/i,
  /orthopedic products/i,
  /Orthopedic structures/i,
  /eighth teeth/i,
  /seventh tooth/i,
  /targeted X-rays/i,
  /targeted images/i,
  /10-teeth arch/i,
  /message us via messenger/i,
  /chairtime/i,
  /in accordance with Privacy Policy/i,
  /Only essential services/i,
];

for (const source of Object.keys(generatedEnglishTranslations)) {
  const translated = translateEnglish(source);
  for (const pattern of forbiddenOutput) {
    assert.equal(pattern.test(translated), false, `Rejected wording ${pattern} remains in: ${source}`);
  }
  assert.equal(
    /[\u200B-\u200D\uFEFF]/u.test(translated),
    false,
    `Zero-width character remains in: ${source}`,
  );
}

console.log(
  `English regressions: ${cases.size + 3} direct checks and ${Object.keys(generatedEnglishTranslations).length} dictionary entries passed.`,
);
