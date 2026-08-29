import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { servicesList } from '../../data/services';
import {
  getDoctorPublicationMissingFields,
  type Doctor,
  type DoctorPublicationField,
  type EducationItem,
} from '../../data/doctors';

interface DoctorRecord extends Doctor {
  visible: boolean;
}

const MAX_PHOTO_BYTES = 100 * 1024;

const inputCls =
  'w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-sm outline-none focus:border-amber-500 transition-colors';
const labelCls = 'block text-xs font-semibold text-zinc-500 mb-1.5';

const doctorPublicationFieldLabels: Record<DoctorPublicationField, string> = {
  name: 'Имя и фамилия на русском',
  slug: 'Адрес страницы',
  specialty: 'Специальность на русском',
  bio: 'Описание на русском',
  educationList: 'Образование на русском',
  nameLatin: 'Имя на латышском / латиницей',
  specialtyEn: 'Специальность на английском',
  experienceEn: 'Стаж на английском',
  bioEn: 'Описание на английском',
  educationListEn: 'Образование на английском',
  specialtyLv: 'Специальность на латышском',
  experienceLv: 'Стаж на латышском',
  bioLv: 'Описание на латышском',
  educationListLv: 'Образование на латышском',
};

/** «Учреждение — подпись», по строке на пункт: textarea проще динамических полей. */
const educationToText = (list?: EducationItem[]) =>
  (list ?? []).map((e) => (e.subtitle ? `${e.title} — ${e.subtitle}` : e.title)).join('\n');

const textToEducation = (text: string): EducationItem[] =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split(' — ');
      return { title: title.trim(), subtitle: rest.join(' — ').trim() || undefined };
    });

/** Карточка одного врача: все поля редактируемые, кнопки действий справа. */
function DoctorEditor({
  doctor,
  index,
  total,
  onSaved,
  onVisibility,
  onDeleted,
  onMove,
}: {
  doctor: DoctorRecord;
  /** Место в списке — оно же порядок на сайте. */
  index: number;
  total: number;
  onSaved: (d: DoctorRecord) => void;
  onVisibility: (id: string, visible: boolean) => void;
  onDeleted: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
}) {
  const [form, setForm] = useState({
    name: doctor.name,
    nameLatin: doctor.nameLatin ?? '',
    slug: doctor.slug,
    specialty: doctor.specialty,
    experience: doctor.experience ?? '',
    bio: doctor.bio,
    services: doctor.services,
    education: educationToText(doctor.educationList),
    specialtyEn: doctor.translations?.en?.specialty ?? '',
    experienceEn: doctor.translations?.en?.experience ?? '',
    bioEn: doctor.translations?.en?.bio ?? '',
    educationEn: educationToText(doctor.translations?.en?.educationList),
    specialtyLv: doctor.translations?.lv?.specialty ?? '',
    experienceLv: doctor.translations?.lv?.experience ?? '',
    bioLv: doctor.translations?.lv?.bio ?? '',
    educationLv: educationToText(doctor.translations?.lv?.educationList),
    photoUrl: doctor.photoUrl ?? '',
    support: doctor.support === true,
  });
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (path: string) =>
    set(
      'services',
      form.services.includes(path)
        ? form.services.filter((s) => s !== path)
        : [...form.services, path],
    );

  const save = async () => {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch(`/api/admin/doctors/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          nameLatin: form.nameLatin,
          slug: form.slug,
          specialty: form.specialty,
          experience: form.experience,
          bio: form.bio,
          services: form.services,
          photoUrl: form.photoUrl,
          photoPosition: doctor.photoPosition,
          support: form.support,
          educationList: textToEducation(form.education),
          translations: {
            en: {
              specialty: form.specialtyEn,
              experience: form.experienceEn,
              bio: form.bioEn,
              educationList: textToEducation(form.educationEn),
            },
            lv: {
              specialty: form.specialtyLv,
              experience: form.experienceLv,
              bio: form.bioLv,
              educationList: textToEducation(form.educationLv),
            },
          },
          // Панель их не редактирует, но обязана вернуть как есть: сервер
          // собирает врача из присланного тела целиком, и отсутствие полей он
          // читает как «стереть». Раньше так и было — сохранение карточки
          // сносило врачу сертификаты и кейсы.
          certificates: doctor.certificates,
          cases: doctor.cases,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        if (json.error === 'translation_incomplete' && Array.isArray(json.missing)) {
          const labels = json.missing
            .map((field: keyof typeof doctorPublicationFieldLabels) =>
              doctorPublicationFieldLabels[field],
            )
            .filter(Boolean);
          throw new Error(`Для публикации заполните: ${labels.join(', ')}.`);
        }
        throw new Error('Не удалось сохранить. Попробуйте ещё раз.');
      }
      onSaved(json.data);
      setNote({ kind: 'ok', text: 'Сохранено.' });
    } catch (error) {
      setNote({
        kind: 'err',
        text: error instanceof Error ? error.message : 'Не удалось сохранить. Попробуйте ещё раз.',
      });
    } finally {
      setBusy(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    setNote(null);
    // Те же проверки, что на сервере, но здесь — чтобы админ увидел понятную
    // причину сразу, а не после ушедшего впустую запроса.
    if (file.type !== 'image/webp' || !file.name.toLowerCase().endsWith('.webp')) {
      setNote({ kind: 'err', text: 'Только формат .webp — сконвертируйте фото перед загрузкой.' });
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setNote({
        kind: 'err',
        text: `Файл ${(file.size / 1024).toFixed(0)} КБ — больше лимита в 100 КБ. Сожмите фото.`,
      });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        `/api/admin/doctors/photo?name=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: file,
        },
      );
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error();
      set('photoUrl', json.data.url);
      setNote({ kind: 'ok', text: 'Фото загружено — не забудьте нажать «Сохранить».' });
    } catch {
      setNote({ kind: 'err', text: 'Загрузка не удалась. Проверьте файл и попробуйте снова.' });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Удалить «${doctor.name}» безвозвратно? Скрыть можно без удаления.`)) return;
    const res = await fetch(`/api/admin/doctors/${doctor.id}`, { method: 'DELETE' });
    if (res.ok) onDeleted(doctor.id);
  };

  const toggleVisible = async () => {
    const next = !doctor.visible;
    const res = await fetch(`/api/admin/doctors/${doctor.id}/visibility`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: next }),
    });
    const json = await res.json().catch(() => null);
    if (res.ok) {
      onVisibility(doctor.id, next);
      setNote({ kind: 'ok', text: next ? 'Врач опубликован.' : 'Врач скрыт.' });
      return;
    }
    if (json?.error === 'translation_incomplete' && Array.isArray(json.missing)) {
      const labels = json.missing
        .map((field: keyof typeof doctorPublicationFieldLabels) =>
          doctorPublicationFieldLabels[field],
        )
        .filter(Boolean);
      setNote({ kind: 'err', text: `Для публикации заполните: ${labels.join(', ')}.` });
      return;
    }
    setNote({ kind: 'err', text: 'Не удалось изменить видимость врача.' });
  };

  const publicationMissing = doctor.requiresEnglishForPublication
    ? getDoctorPublicationMissingFields(doctor)
    : [];

  return (
    <article
      data-doctor-id={doctor.id}
      className={cn(
        'bg-white rounded-2xl border p-5 lg:p-6',
        doctor.visible ? 'border-zinc-200' : 'border-dashed border-zinc-300 opacity-70',
      )}
    >
      {/* Шапка карточки: место в списке и перестановка. Тот же порядок
          применяется на странице врачей и в карусели на главной. */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-100">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {index + 1} из {total}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
            aria-label={`Переместить «${doctor.name}» выше`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 disabled:hover:border-zinc-300 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowUp size={15} />
          </button>
          <button
            type="button"
            onClick={() => onMove(index, 1)}
            disabled={index === total - 1}
            aria-label={`Переместить «${doctor.name}» ниже`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 disabled:hover:border-zinc-300 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowDown size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Фото + загрузка */}
        <div className="w-40 mx-auto md:mx-0 md:w-44 shrink-0">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 mb-3">
            {form.photoUrl ? (
              <img src={form.photoUrl} alt={form.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 px-3 text-center">
                Фото нет
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/webp,.webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadPhoto(file);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-300 hover:border-zinc-900 px-3 py-2.5 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Upload size={14} /> Загрузить фото
          </button>
          <p className="mt-1.5 text-[11px] leading-snug text-zinc-400">
            Только .webp, до 100 КБ. Попадает в папку staff.
          </p>
        </div>

        {/* Поля */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Имя и фамилия</label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Специальность</label>
            <input value={form.specialty} onChange={(e) => set('specialty', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Стаж (например, «12 лет»)</label>
            <input value={form.experience} onChange={(e) => set('experience', e.target.value)} className={inputCls} />
          </div>
          {/* Поле редактируемое, а не только для чтения: без него у нового
              сотрудника адрес откатился бы на внутренний id — метку времени
              вида /doctors/1787935427820. */}
          <div className="sm:col-span-2">
            <label className={labelCls}>Адрес страницы</label>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-zinc-400 shrink-0">/doctors/</span>
              <input
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="familia"
                className={inputCls}
              />
            </div>
            <p className="mt-1.5 text-xs text-zinc-400">
              Фамилия латиницей, строчными. У однофамильцев добавьте имя: «ivanova-anna».
            </p>
          </div>
          <div className="flex items-end pb-2.5">
            <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.support}
                onChange={(e) => set('support', e.target.checked)}
                className="h-4 w-4 accent-amber-500"
              />
              Вспомогательный персонал (без личной страницы)
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Описание</label>
            <textarea
              value={form.bio}
              onChange={(e) => set('bio', e.target.value)}
              rows={3}
              className={cn(inputCls, 'resize-y')}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Образование — по строке на пункт: «Учреждение — пояснение»</label>
            <textarea
              value={form.education}
              onChange={(e) => set('education', e.target.value)}
              rows={2}
              className={cn(inputCls, 'resize-y')}
            />
          </div>
          <div className="sm:col-span-2">
            <span className={labelCls}>Услуги врача</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {servicesList.map((s) => {
                const path = `/services/${s.id}`;
                return (
                  <label key={s.id} className="flex items-center gap-1.5 text-sm text-zinc-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.services.includes(path)}
                      onChange={() => toggleService(path)}
                      className="h-4 w-4 accent-amber-500"
                    />
                    {s.title}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Имя латиницей общее для латышской и английской версий, поэтому
              стоит перед обоими языковыми блоками, а не внутри одного из них. */}
          <div className="sm:col-span-2 mt-2">
            <label className={labelCls}>
              Имя на латышском / латиницей — используется в обеих языковых версиях
            </label>
            <input
              value={form.nameLatin}
              onChange={(e) => set('nameLatin', e.target.value)}
              placeholder="Elīna Heifeca"
              className={inputCls}
            />
          </div>

          <div className="sm:col-span-2 mt-2 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <h3 className="text-sm font-semibold text-emerald-950">Латышская версия</h3>
            <p className="mt-1 text-xs text-emerald-700">
              Основной язык сайта. Для новых врачей эти поля обязательны перед публикацией.
            </p>
          </div>
          <div>
            <label className={labelCls}>Специальность на латышском</label>
            <input
              value={form.specialtyLv}
              onChange={(e) => set('specialtyLv', e.target.value)}
              placeholder="Zobārsts, protēzists"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Стаж на латышском</label>
            <input
              value={form.experienceLv}
              onChange={(e) => set('experienceLv', e.target.value)}
              placeholder="12 gadu pieredze"
              className={inputCls}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Описание на латышском</label>
            <textarea
              value={form.bioLv}
              onChange={(e) => set('bioLv', e.target.value)}
              rows={3}
              className={cn(inputCls, 'resize-y')}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Образование на латышском — по одному пункту в строке: «Учреждение — подробности»
            </label>
            <textarea
              value={form.educationLv}
              onChange={(e) => set('educationLv', e.target.value)}
              rows={2}
              className={cn(inputCls, 'resize-y')}
            />
          </div>

          <div className="sm:col-span-2 mt-2 rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
            <h3 className="text-sm font-semibold text-blue-950">Английская версия</h3>
            <p className="mt-1 text-xs text-blue-700">
              Для новых врачей эти поля обязательны перед публикацией.
            </p>
          </div>
          <div>
            <label className={labelCls}>Специальность на английском</label>
            <input
              value={form.specialtyEn}
              onChange={(e) => set('specialtyEn', e.target.value)}
              placeholder="Prosthodontist"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Стаж на английском</label>
            <input
              value={form.experienceEn}
              onChange={(e) => set('experienceEn', e.target.value)}
              placeholder="12 years"
              className={inputCls}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Описание на английском</label>
            <textarea
              value={form.bioEn}
              onChange={(e) => set('bioEn', e.target.value)}
              rows={3}
              className={cn(inputCls, 'resize-y')}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Образование на английском — по одному пункту в строке: «Учреждение — подробности»
            </label>
            <textarea
              value={form.educationEn}
              onChange={(e) => set('educationEn', e.target.value)}
              rows={2}
              className={cn(inputCls, 'resize-y')}
            />
          </div>
        </div>
      </div>

      {doctor.requiresEnglishForPublication && !doctor.visible && publicationMissing.length > 0 && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">Черновик нельзя опубликовать</p>
          <p className="mt-1">
            Заполните и сохраните: {publicationMissing.map((field) => doctorPublicationFieldLabels[field]).join(', ')}.
          </p>
        </div>
      )}

      {/* Действия */}
      <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-900 px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {busy ? 'Подождите…' : 'Сохранить'}
        </button>
        <button
          type="button"
          onClick={toggleVisible}
          disabled={!doctor.visible && publicationMissing.length > 0}
          className="flex items-center gap-2 rounded-xl border border-zinc-300 hover:border-zinc-900 px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-300"
        >
          {doctor.visible ? (
            <>
              <EyeOff size={15} /> Скрыть со страницы
            </>
          ) : (
            <>
              <Eye size={15} /> Показать на странице
            </>
          )}
        </button>
        <button
          type="button"
          onClick={remove}
          className="flex items-center gap-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Trash2 size={15} /> Удалить
        </button>
        {!doctor.visible && (
          <span className="text-xs text-zinc-400">Скрыт — на сайте не показывается</span>
        )}
        {note && (
          <span className={cn('text-sm', note.kind === 'ok' ? 'text-green-600' : 'text-red-600')}>
            {note.text}
          </span>
        )}
      </div>
    </article>
  );
}

/** Вкладка «Врачи»: список карточек, добавление, правка, скрытие, удаление. */
export function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/doctors')
      .then((r) => r.json())
      .then((json) => {
        if (json?.success) setDoctors(json.data);
        else setError('Не удалось загрузить список врачей.');
      })
      .catch(() => setError('Не удалось загрузить список врачей.'))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Перестановка соседей. Список обновляем сразу, не дожидаясь сервера:
   * карточки высокие, и задержка на запрос читалась бы как «кнопка залипла».
   * При ошибке возвращаем прежний порядок и говорим об этом.
   */
  const moveDoctor = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= doctors.length) return;

    const previous = doctors;
    const next = [...doctors];
    [next[index], next[target]] = [next[target], next[index]];
    setDoctors(next);
    setError(null);

    // Карточка уезжает вместе с содержимым — возвращаем её в поле зрения,
    // иначе после клика администратор смотрит на чужого врача.
    requestAnimationFrame(() => {
      document
        .querySelector(`[data-doctor-id="${next[target].id}"]`)
        ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });

    try {
      const res = await fetch('/api/admin/doctors/order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: next.map((d) => d.id) }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setDoctors(previous);
      setError('Не удалось сохранить порядок. Попробуйте ещё раз.');
    }
  };

  const addDoctor = async () => {
    const res = await fetch('/api/admin/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Новый сотрудник', specialty: '', bio: '', services: [] }),
    });
    const json = await res.json();
    if (res.ok && json.success) setDoctors((list) => [json.data, ...list]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Врачи</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Эти карточки показываются на странице «Врачи» и на главной в том же
            порядке, что и здесь. Всего: {doctors.length}
          </p>
        </div>
        <button
          type="button"
          onClick={addDoctor}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus size={15} /> Добавить врача
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-zinc-400">Загружаем…</p>}

      <div className="flex flex-col gap-5">
        {doctors.map((doctor, i) => (
          <DoctorEditor
            // key с visible: смена видимости приходит извне карточки, и без
            // этого её локальная форма не знала бы об обновлении.
            key={`${doctor.id}-${doctor.visible}`}
            doctor={doctor}
            index={i}
            total={doctors.length}
            onMove={moveDoctor}
            onSaved={(d) => setDoctors((list) => list.map((x) => (x.id === d.id ? { ...d, visible: x.visible } : x)))}
            onVisibility={(id, visible) =>
              setDoctors((list) => list.map((x) => (x.id === id ? { ...x, visible } : x)))
            }
            onDeleted={(id) => setDoctors((list) => list.filter((x) => x.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}
