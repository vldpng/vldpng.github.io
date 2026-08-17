import { useEffect, useState } from 'react';
import { doctorsData, type Doctor } from '../data/doctors';

/**
 * Список врачей для публичных страниц.
 *
 * Источник — /api/doctors (правки из панели администратора видны сразу),
 * но стартуем со статического списка из data/doctors.ts. Это не только
 * мгновенный первый кадр: на GitHub Pages бэкенда нет вовсе, там fetch
 * получает index.html вместо JSON и мы молча остаёмся на статике —
 * до переезда на GarmTech сайт продолжает работать как раньше.
 */
export function useDoctors(): Doctor[] {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData);

  useEffect(() => {
    let alive = true;
    fetch('/api/doctors')
      .then((r) => r.json())
      .then((json) => {
        if (alive && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setDoctors(json.data as Doctor[]);
        }
      })
      .catch(() => {
        /* статический список уже показан */
      });
    return () => {
      alive = false;
    };
  }, []);

  return doctors;
}
