import { useState, useMemo, useCallback } from 'react';
import { FolderGit2, FolderOpen } from 'lucide-react';
import clsx from 'clsx';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo<ProjectCategory[]>(() => {
    const defaultCategories: ProjectCategory[] = ['All', 'Web App', 'AI / Data', 'Tools', 'Open Source'];
    const projectCategories = projects.map(p => p.category);
    return Array.from(new Set([...defaultCategories, ...projectCategories])) as ProjectCategory[];
  }, [projects]);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleOpenDetails = useCallback((p: Project) => setSelectedProject(p), []);
  const handleCloseDetails = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          id="projects-heading"
          icon={FolderGit2}
          eyebrow="Featured Portfolio"
          title="精選 Side Projects"
          description="點選卡片可查看架構詳情與線上 Demo，未來將持續更新更多好玩的獨立作品。"
        />

        <div className="space-y-4">
          {/* Category Filters */}
          <div role="group" aria-label="專案分類篩選" className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={clsx(
                    'px-4 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-cyan-700 text-white shadow-md shadow-cyan-700/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                  )}
                >
                  {cat === 'All' ? '全部專案 (All)' : cat}
                </button>
              );
            })}
          </div>

          {/* 篩選結果回饋：同時作為螢幕閱讀器的即時通知區 */}
          <div role="status" aria-live="polite">
            {filteredProjects.length > 0 ? (
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                共 {filteredProjects.length} 個專案
              </p>
            ) : (
              <div className="flex flex-col items-center gap-3 py-12 text-slate-600 dark:text-slate-400">
                <FolderOpen className="w-10 h-10 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                <p>此分類下目前暫無專案，敬請期待！</p>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseDetails}
      />
    </section>
  );
}
