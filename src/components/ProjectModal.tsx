import { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle, Tag } from 'lucide-react';
import { Project } from '../types';
import { GithubIcon } from './icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const statusDisplay: Record<NonNullable<Project['status']>, { label: string; dot: string }> = {
  Completed: { label: '已完成', dot: 'bg-emerald-500' },
  'In Progress': { label: '進行中', dot: 'bg-amber-500' },
  Maintenance: { label: '維護中', dot: 'bg-slate-400' },
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // 以 ref 保存最新的 onClose，避免父層每次 render 傳入新函式時重跑下方 effect（會重置焦點）
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      // 將 Tab 焦點限制在對話框內循環
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!panelRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // 關閉後把焦點還給開啟前的元素（通常是卡片上的「詳細資訊」按鈕）
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!project) return null;

  const status = project.status ? statusDisplay[project.status] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90dvh] overflow-y-auto overscroll-contain animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="關閉視窗"
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-700/20 dark:border-cyan-400/20">
              {project.category}
            </span>
            {status && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                狀態：{status.label}
              </span>
            )}
          </div>
          <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-balance">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{project.fullDescription}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              專案核心亮點 (Key Highlights)
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-700 dark:text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Tag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>使用技術</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Links */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-semibold text-sm shadow-md transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>開啟即時 Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>查看 GitHub 原始碼</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
