import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next internal paths
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
