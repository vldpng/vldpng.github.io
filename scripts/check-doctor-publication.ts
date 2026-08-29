import assert from 'node:assert/strict';
import {
  getDoctorPublicationMissingFields,
  localizeDoctor,
  type Doctor,
} from '../src/data/doctors';

const draft: Doctor = {
  id: 'new-1',
  slug: 'new-1',
  name: 'Новый сотрудник',
  specialty: '',
  bio: '',
  services: [],
  photoLabel: '[Фото — Новый сотрудник]',
  requiresEnglishForPublication: true,
};

const draftMissing = getDoctorPublicationMissingFields(draft);
for (const field of [
  'name',
  'slug',
  'specialty',
  'bio',
  'educationList',
  'nameLatin',
  'specialtyEn',
  'bioEn',
  'educationListEn',
  'specialtyLv',
  'bioLv',
  'educationListLv',
] as const) {
  assert.ok(draftMissing.includes(field), `Draft must require ${field}`);
}

const complete: Doctor = {
  ...draft,
  slug: 'anna-ivanova',
  name: 'Анна Иванова',
  nameLatin: 'Anna Ivanova',
  specialty: 'Стоматолог-терапевт',
  experience: '12 лет',
  bio: 'Проводит терапевтическое лечение зубов.',
  educationList: [{ title: 'Рижский университет Страдиня' }],
  translations: {
    en: {
      specialty: 'General Dentist',
      experience: '12 years',
      bio: 'Provides restorative dental treatment.',
      educationList: [{ title: 'Rīga Stradiņš University' }],
    },
    lv: {
      specialty: 'Zobārsts',
      experience: '12 gadu pieredze',
      bio: 'Veic zobu terapeitisko ārstēšanu.',
      educationList: [{ title: 'Rīgas Stradiņa universitāte' }],
    },
  },
};

assert.deepEqual(getDoctorPublicationMissingFields(complete), []);

const english = localizeDoctor(complete, 'en');
assert.equal(english.name, 'Anna Ivanova');
assert.equal(english.specialty, 'General Dentist');
assert.equal(english.experience, '12 years');
assert.equal(english.bio, 'Provides restorative dental treatment.');
assert.deepEqual(english.educationList, [{ title: 'Rīga Stradiņš University' }]);
assert.equal(english.photoLabel, '[Photo — Anna Ivanova]');

const latvian = localizeDoctor(complete, 'lv');
assert.equal(latvian.name, 'Anna Ivanova');
assert.equal(latvian.specialty, 'Zobārsts');
assert.equal(latvian.experience, '12 gadu pieredze');
assert.equal(latvian.bio, 'Veic zobu terapeitisko ārstēšanu.');
assert.deepEqual(latvian.educationList, [{ title: 'Rīgas Stradiņa universitāte' }]);
assert.equal(latvian.photoLabel, '[Foto — Anna Ivanova]');

const russian = localizeDoctor(complete, 'ru');
assert.equal(russian.name, 'Анна Иванова');

// Неполный перевод не должен подставляться частично: карточка остаётся русской.
const withoutLatvian: Doctor = { ...complete, translations: { en: complete.translations!.en } };
assert.equal(localizeDoctor(withoutLatvian, 'lv').name, 'Анна Иванова');
assert.equal(localizeDoctor(withoutLatvian, 'lv').specialty, 'Стоматолог-терапевт');

const legacyNumericExperience: Doctor = {
  ...withoutLatvian,
  experience: '15',
  translations: undefined,
};
assert.equal(localizeDoctor(legacyNumericExperience, 'lv').experience, '15 gadi');
assert.equal(localizeDoctor(legacyNumericExperience, 'en').experience, '15 years');
assert.equal(localizeDoctor(legacyNumericExperience, 'ru').experience, '15 лет');

console.log('Doctor publication: draft validation, Latvian and English localization passed.');
