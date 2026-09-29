import type { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  /** 供所屬 <section> 以 aria-labelledby 引用 */
  id: string;
  description?: string;
}

export function SectionHeading({ icon: Icon, eyebrow, title, id, description }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
        <Icon className="w-4 h-4" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 id={id} className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
