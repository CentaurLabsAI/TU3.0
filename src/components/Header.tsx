"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/courses", label: "Курсы" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <>
      {/* Header bar */}
      <header
        className="fixed top-0 z-50 w-full bg-[var(--background)] transition-shadow duration-[400ms] ease-in-out"
        style={{
          boxShadow: scrolled
            ? "0 1px 0 rgba(0,0,0,0.1)"
            : "none",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "calc(100% - 80px)",
            padding: "0 20px",
            height: scrolled ? "64px" : "80px",
            transition: "height 0.4s ease-in-out",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo/logo-tochka.png"
              alt="Точка Успеха — SEO агентство"
              width={164}
              height={137}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Right side: email | "Меню" toggle */}
          <div className="flex items-center">
            {/* Email link — hidden on small screens */}
            <a
              href="mailto:info@tu.by"
              className="hidden sm:inline-block font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
              style={{
                fontSize: scrolled ? "20px" : "24px",
                paddingRight: "35px",
                borderRight: "1px solid var(--foreground)",
                transition:
                  "font-size 0.4s ease-in-out, color 0.2s ease-in-out",
              }}
            >
              info@tu.by
            </a>

            {/* Theme toggle */}
            <div className="hidden sm:flex items-center pl-4 pr-2">
              <ThemeToggle />
            </div>

            {/* "Меню" toggle button with hamburger icon */}
            <button
              onClick={toggleMenu}
              className="font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 cursor-pointer select-none flex items-center gap-2"
              style={{
                fontSize: scrolled ? "20px" : "24px",
                paddingLeft: "35px",
                fontFamily: "Mulish, sans-serif",
                transition:
                  "font-size 0.4s ease-in-out, color 0.2s ease-in-out",
              }}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
            >
              <span className="hidden sm:inline">Меню</span>
              <svg className="w-6 h-6 sm:w-6 sm:h-6 max-sm:w-8 max-sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[90] transition-opacity duration-[400ms] ease-in-out"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Sidebar slide-in panel */}
      <aside
        className="fixed top-0 right-0 z-[100] h-full bg-[var(--background)] border-l border-[var(--border-strong)]"
        style={{
          width: "400px",
          maxWidth: "75%",
          padding: "40px",
          transform: menuOpen ? "translateX(0)" : "translateX(400px)",
          transition: "transform 0.4s ease-in-out",
        }}
        aria-label="Навигация"
        role="dialog"
        aria-modal={menuOpen}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 cursor-pointer"
          aria-label="Закрыть меню"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar nav links */}
        <nav className="mt-12 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block py-2 font-semibold text-[var(--foreground)] transition-all duration-200 hover:text-[var(--primary)] hover:translate-x-[10px]"
              style={{
                fontSize: "22px",
                fontFamily: "Mulish, sans-serif",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Email + theme toggle inside sidebar for small screens */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          <a
            href="mailto:info@tu.by"
            className="font-semibold text-[18px] text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
            style={{ fontFamily: "Mulish, sans-serif" }}
          >
            info@tu.by
          </a>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
