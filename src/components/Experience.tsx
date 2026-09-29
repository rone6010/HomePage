import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';
import { SectionHeading } from './SectionHeading';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          id="experience-heading"
          icon={Briefcase}
          eyebrow="Career Path"
          title="經歷與里程碑"
        />

        {/* Timeline */}
        <ol className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-10">
          {experiences.map((exp) => (
            <li key={exp.id} className="relative group">
              {/* Timeline Dot */}
              <div aria-hidden="true" className="absolute -left-[33px] sm:-left-[41px] top-[30px] w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-cyan-600 dark:border-cyan-400 group-hover:scale-125 transition-transform" />

              <div className="space-y-2 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role} · <span className="text-cyan-700 dark:text-cyan-400 font-medium">{exp.organization}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                <ul className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s) => (
                    <li
                      key={s}
                      className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
