"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { key: "topics", href: "/topics" },
  { key: "visualize", href: "/visualize" },
  { key: "learn", href: "/learn" },
  { key: "practice", href: "/practice" },
  { key: "playground", href: "/playground" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if a nav item is active
  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] shadow-lg group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              DSA Visualizer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active
                    ? "text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                    }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border-primary)] animate-slide-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${active
                      ? "text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/20"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

