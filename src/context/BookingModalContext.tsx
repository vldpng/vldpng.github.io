import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface BookingModalContextType {
  isOpen: boolean;
  /** Optionally preselect a doctor by Altegio staff id. */
  preselectStaffId: number | null;
  openModal: (staffId?: number) => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

/** Через сколько мс после загрузки сайта автоматически предложить запись. */
const AUTO_OPEN_DELAY_MS = 60_000;
/** Ключ в sessionStorage, чтобы показать авто-окно только один раз за сессию. */
const AUTO_OPEN_KEY = 'booking-auto-shown';

function markAutoShown() {
  try {
    sessionStorage.setItem(AUTO_OPEN_KEY, '1');
  } catch {
    /* sessionStorage может быть недоступен (приватный режим) — игнорируем */
  }
}

function wasAutoShown() {
  try {
    return sessionStorage.getItem(AUTO_OPEN_KEY) === '1';
  } catch {
    return false;
  }
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectStaffId, setPreselectStaffId] = useState<number | null>(null);

  // Всегда держим актуальное значение isOpen для таймера.
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const openModal = (staffId?: number) => {
    // Пользователь сам открыл запись — авто-показ больше не нужен.
    markAutoShown();
    setPreselectStaffId(staffId ?? null);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  // Автоматически открыть окно записи через 60 секунд (один раз за сессию).
  useEffect(() => {
    if (wasAutoShown()) return;

    const timer = setTimeout(() => {
      // Не перебиваем, если окно уже открыто или его уже показывали.
      if (isOpenRef.current || wasAutoShown()) return;
      markAutoShown();
      setPreselectStaffId(null);
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BookingModalContext.Provider value={{ isOpen, preselectStaffId, openModal, closeModal }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
}
