"use client"; 

import React from "react";
import { handleHashClick } from "@/lib/utils";
import { Link } from "react-router-dom";

export function NavHeader() {
  return (
    <ul className="hidden md:flex items-center gap-2 lg:gap-6 relative z-50">
      <Tab href="/about">Про нас</Tab>
      <Tab href="/services">Услуги</Tab>
      <Tab href="/doctors">Врачи</Tab>
      <Tab href="/prices">Цены</Tab>
      <Tab href="/patients">Пациентам</Tab>
      <Tab href="/#reviews" onClick={handleHashClick('#reviews')}>Отзывы</Tab>
    </ul>
  );
}

const Tab = ({
  children,
  href,
  onMouseEnter,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onMouseEnter?: () => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <Link
      to={href}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="block whitespace-nowrap px-4 py-2 text-base lg:text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
    >
      {children}
    </Link>
  );
};
