"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { key: "topics", href: "/topics" },
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
    <header
      className="sticky top-0 z-50 w-full border-b border-white/20 backdrop-blur-2xl transition-all duration-300 shadow-lg"
      style={{ background: "linear-gradient(90deg, rgb(89 54 160) 0%, rgb(229 227 245 / 75%) 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-lg border border-white/20 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo_light.png"
                alt="Algo Arcade Lab Logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <span className="text-lg font-bold text-white hidden lg:block whitespace-nowrap">
              Algo Arcade Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/20 p-1 rounded-full border border-white/30 shadow-sm backdrop-blur-md">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`relative px-2.5 lg:px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${active
                    ? "text-[#482C88] bg-white shadow-sm font-bold"
                    : "text-white hover:text-[#482C88] hover:bg-white/50"
                    }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions - using darker text for contrast against light gradient end */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-[#482C88]">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>

            <div className="h-6 w-px bg-black/10 hidden md:block" />

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                href="/login"
                className="text-sm font-bold text-[#482C88] hover:text-[#5b21b6] transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                href={`/${locale}/courses`}
                className="inline-flex items-center justify-center px-4 lg:px-5 py-2 text-sm font-bold text-white bg-[#482C88] rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden text-[#482C88]">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#482C88]/10 hover:text-[#482C88]"
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
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20 animate-slide-down bg-[#482C88]/95 backdrop-blur-xl absolute left-0 right-0 px-4 shadow-xl border-b border-white/10 rounded-b-2xl">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center justify-between ${active
                      ? "text-[#482C88] bg-white"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                    {active && <div className="w-1.5 h-1.5 rounded-full bg-[#482C88]" />}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/login"
                className="px-4 py-3 text-base font-medium text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href={`/${locale}/courses`}
                className="px-4 py-3 text-base font-medium text-center text-[#482C88] bg-white rounded-xl hover:shadow-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
              <div className="flex justify-center pt-2 text-white">
                <LocaleSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

