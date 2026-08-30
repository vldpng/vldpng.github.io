import { clinic } from './clinic';

export interface SocialLink {
  /** Цветной логотип из /public/icons — рисуется обычным <img>. */
  src: string;
  href: string;
  label: string;
}

/**
 * Соцсети клиники для шапки, подвала и модалок.
 *
 * Иконки — цветные растровые логотипы, а не контуры lucide: клиника прислала
 * фирменный набор, и подменять его перекрашенными контурами нельзя — у
 * WhatsApp и Telegram у lucide вообще нет логотипов, там стояли похожие по
 * смыслу значки (MessageCircle и Send).
 *
 * Иконки без адреса отфильтрованы: раньше в них стоял `href="#"`, и клик
 * просто прыгал в начало страницы. Как только адрес появится в clinic.social,
 * кнопка сама возникнет во всех местах — правка нужна только в одном файле.
 */
export const socialLinks: SocialLink[] = (
  [
    { src: '/images/icons/instagram.webp', href: clinic.social.instagram, label: 'Instagram' },
    { src: '/images/icons/facebook.webp', href: clinic.social.facebook, label: 'Facebook' },
    { src: '/images/icons/whatsapp.webp', href: clinic.social.whatsapp, label: 'WhatsApp' },
    { src: '/images/icons/telegram.webp', href: clinic.social.telegram, label: 'Telegram' },
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
