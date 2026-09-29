import { User, Layers, CheckCircle2, MapPin, Mail } from 'lucide-react';
import { PersonalInfo, SkillCategory } from '../types';
import { SectionHeading } from './SectionHeading';

interface AboutProps {
  info: PersonalInfo;
  categories: SkillCategory[];
}

export function About({ info, categories }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          id="about-heading"
          icon={User}
          eyebrow="About & Skills"
          title="關於我與技術專長"
          description="結合工程思維與產品體驗，持續探索高效能與實用的解決方案。"
        />

        {/* Bio Card & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio Description */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Hello! 我是 {info.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {info.bio}
            </p>
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                <span>{info.location}</span>
              </div>
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-1.5 rounded hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                {info.email}
              </a>
            </div>
          </div>

          {/* Quick Highlights Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 tracking-wider uppercase">Focus & Values</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">開發理念</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />
                  <span>以使用者體驗為導向</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />
                  <span>乾淨易維護的模組化架構</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />
                  <span>熱衷將 GenAI 融入日常應用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="space-y-6 scroll-mt-20">
          <h3 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl">
            <Layers className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
            <span>核心技術棧 (Tech Stack)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.category}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/40 transition-colors"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/60">
                  {cat.category}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
