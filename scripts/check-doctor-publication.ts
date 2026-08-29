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

const russian = localizeDoctor(complete, 'ru');
assert.equal(russian.name, 'Анна Иванова');

console.log('Doctor publication: draft validation and English localization passed.');
