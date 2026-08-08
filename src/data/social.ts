import { Instagram, Facebook, MessageCircle, Send, type LucideIcon } from 'lucide-react';
import { clinic } from './clinic';

export interface SocialLink {
  Icon: LucideIcon;
  href: string;
  label: string;
  /** У логотипа Facebook контур почти не читается — нужна сплошная заливка. */
  filled?: boolean;
}

/**
 * Соцсети клиники для шапки, подвала и модалок.
 *
 * Иконки без адреса отфильтрованы: раньше в них стоял `href="#"`, и клик
 * просто прыгал в начало страницы. Как только адрес появится в clinic.social,
 * кнопка сама возникнет во всех местах — правка нужна только в одном файле.
 */
export const socialLinks: SocialLink[] = (
  [
    { Icon: Instagram, href: clinic.social.instagram, label: 'Instagram' },
    { Icon: Facebook, href: clinic.social.facebook, label: 'Facebook', filled: true },
    { Icon: MessageCircle, href: clinic.social.whatsapp, label: 'WhatsApp' },
    { Icon: Send, href: clinic.social.telegram, label: 'Telegram' },
  ] satisfies SocialLink[]
).filter((s) => s.href.length > 0);

/**
 * Атрибуты внешней ссылки. rel обязателен вместе с target: без noopener
 * открытая вкладка получает доступ к window.opener и может подменить
 * страницу, с которой её открыли.
 */
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
