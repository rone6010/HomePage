import { ArrowUp } from 'lucide-react';
import { PersonalInfo } from '../types';

interface FooterProps {
  info: PersonalInfo;
}

export function Footer({ info }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 space-y-3">
        <p>© {currentYear} {info.name}. All rights reserved.</p>
        <p className="text-slate-500 dark:text-slate-400">
          Built with React & Tailwind CSS. Hosted on GitHub Pages.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1 rounded px-2 py-1 font-medium hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          <span>回到頂端</span>
        </a>
      </div>
    </footer>
  );
}
