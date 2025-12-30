import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("app");

  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <span>© {new Date().getFullYear()} {t("name")}.</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 hidden sm:inline" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
