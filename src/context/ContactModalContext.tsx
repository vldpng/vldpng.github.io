import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Стабильные ссылки: модалка вешает обработчик Escape в useEffect с
  // closeModal в зависимостях, а провайдер оборачивает всё приложение —
  // без мемоизации обработчик пересоздавался бы на каждый рендер,
  // и вместе с ним перерисовывались бы все потребители контекста.
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}
