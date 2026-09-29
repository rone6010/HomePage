import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react';
import clsx from 'clsx';
import { useTheme, Theme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  name: string;
}

const navLinks = [
  { label: '關於我', href: '#about' },
  { label: '專業技能', href: '#skills' },
  { label: '作品展示', href: '#projects' },
  { label: '經歷', href: '#experience' },
  { label: '聯絡我', href: '#contact' },
];

const sectionIds = navLinks.map((link) => link.href.slice(1));

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="切換主題"
      title={theme === 'dark' ? '切換為淺色模式' : '切換為深色模式'}
      className={clsx(
        'inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </button>
  );
}

export function Navbar({ name }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // 選單開啟時：按 Esc 或點選導覽列以外的地方即關閉
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (e: Event) => {
      if (!headerRef.current?.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="flex items-center gap-2 group rounded-lg">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="主選單" className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={clsx(
                  'relative py-1 transition-colors hover:text-cyan-700 dark:hover:text-cyan-400',
                  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform',
                  isActive && 'text-cyan-700 dark:text-cyan-400 after:scale-x-100',
                )}
              >
                {link.label}
              </a>
            );
          })}

          <ThemeToggle theme={theme} onToggle={toggleTheme} className="h-9 w-9" />
        </nav>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="h-11 w-11" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="行動版主選單"
          className="md:hidden animate-slideDown border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-4 py-2"
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'block rounded-lg px-3 py-3 text-base font-medium hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-700 dark:hover:text-cyan-400',
                  isActive ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-500/10' : 'text-slate-700 dark:text-slate-200',
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
