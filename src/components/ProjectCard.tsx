import { ExternalLink, Info, Star } from 'lucide-react';
import { Project } from '../types';
import { GithubIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

const iconLinkClass =
  'relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg transition';

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 has-[:focus-visible]:border-cyan-500/70 has-[:focus-visible]:shadow-xl has-[:focus-visible]:shadow-cyan-500/10 transition-all duration-300">
      {/* Top Banner / Placeholder Gradient。isolate 讓內部的 z-10 不會蓋過下方「詳細資訊」按鈕撐滿整張卡片的點擊層 */}
      <div className="relative isolate h-44 w-full bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 p-6 flex flex-col justify-between overflow-hidden">
        {/* Glow */}
        <div aria-hidden="true" className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-cyan-300 backdrop-blur border border-white/10">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-300" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <div className="z-10">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors text-balance">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <ul className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {/* after: 偽元素撐滿整張卡片，讓整張卡片都能點擊開啟詳情（GitHub / Demo 連結以 z-10 浮在其上） */}
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            aria-label={`查看 ${project.title} 詳細資訊`}
            className="inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline after:absolute after:inset-0 after:content-['']"
          >
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            <span>詳細資訊</span>
          </button>

          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`查看 ${project.title} 原始碼`}
                className={`${iconLinkClass} text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`開啟 ${project.title} Demo`}
                className={`${iconLinkClass} text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500/10`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
