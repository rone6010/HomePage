import { PersonalInfo } from '../types';

interface FooterProps {
  info: PersonalInfo;
}

export function Footer({ info }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p>© {currentYear} {info.name}. All rights reserved.</p>
        <p className="text-slate-400 dark:text-slate-500">
          Built with React & Tailwind CSS. Hosted on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
