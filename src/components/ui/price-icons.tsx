import React from 'react';
import {
  Baby,
  Bandage,
  Layers,
  Microscope,
  Search,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from 'lucide-react';
import { MaskIcon } from './MaskIcon';

/**
 * Иконки категорий прайса.
 *
 * В данных категории хранится имя иконки, а не компонент: каталог лежит
 * в базе и правится через админку, туда React-компонент не положить.
 * Здесь имя превращается обратно в картинку.
 */
export const PRICE_ICONS: Record<string, LucideIcon> = {
  Search,
  Bandage,
  Microscope,
  Layers,
  Syringe,
  Smile,
  Baby,
  Sparkles,
  Stethoscope,
};

/** Список для выпадающего меню в панели администратора. */
export const PRICE_ICON_NAMES = Object.keys(PRICE_ICONS);

/**
 * Рисует иконку категории: если задана своя SVG-маска — её, иначе
 * подбирает по имени. Неизвестное имя не роняет страницу, а показывает
 * нейтральный значок: данные приходят из базы и могут содержать что угодно.
 */
export function PriceIcon({ icon, iconSrc, className }: { icon: string; iconSrc?: string; className?: string }) {
  if (iconSrc) return <MaskIcon src={iconSrc} className={className} />;
  const Icon = PRICE_ICONS[icon] ?? Stethoscope;
  return <Icon className={className} />;
}
