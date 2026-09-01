import { User, Layers, CheckCircle2, MapPin, Mail } from 'lucide-react';
import { PersonalInfo, SkillCategory } from '../types';

interface AboutProps {
  info: PersonalInfo;
  categories: SkillCategory[];
}

export function About({ info, categories }: AboutProps) {
  return (
    <section id="about" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
            <User className="w-4 h-4" />
            <span>About & Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            關於我與技術專長
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            結合工程思維與產品體驗，持續探索高效能與實用的解決方案。
          </p>
        </div>

        {/* Bio Card & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio Description */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Hello! 我是 {info.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {info.bio}
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>{info.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>{info.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Highlights Card */}
          <div className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">Focus & Values</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">開發理念</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>以使用者體驗為導向</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>乾淨易維護的模組化架構</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>熱衷將 GenAI 融入日常應用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl">
            <Layers className="w-5 h-5 text-cyan-500" />
            <span>核心技術棧 (Tech Stack)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/40 transition-colors"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/60">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
