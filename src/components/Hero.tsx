import { Mail, ArrowRight, FolderGit2 } from 'lucide-react';
import { PersonalInfo } from '../types';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons';

interface HeroProps {
  info: PersonalInfo;
}

const socialLinkClass =
  'inline-flex items-center justify-center h-12 w-12 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition';

export function Hero({ info }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background Decorative Gradients */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/15 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Status Badge */}
          <div className="motion-safe:animate-fadeUp inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-700/30 dark:border-cyan-400/30 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Open for Side Projects & Collaboration</span>
          </div>

          {/* Heading */}
          <h1 className="motion-safe:animate-fadeUp [animation-delay:100ms] text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-700 via-sky-600 to-indigo-600 dark:from-cyan-400 dark:via-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">{info.name}</span>
            {info.chineseName && <span className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400 font-normal ml-3">({info.chineseName})</span>}
          </h1>

          {/* Title & Tagline */}
          <p className="motion-safe:animate-fadeUp [animation-delay:200ms] text-lg sm:text-xl font-medium text-cyan-700 dark:text-cyan-400">
            {info.title}
          </p>
          <p className="motion-safe:animate-fadeUp [animation-delay:300ms] text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed text-balance">
            {info.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="motion-safe:animate-fadeUp [animation-delay:400ms] flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-800 hover:to-blue-800 text-white font-semibold shadow-lg shadow-cyan-700/25 hover:shadow-cyan-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>探索 Side Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Mail className="w-4 h-4" />
              <span>聯絡我</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="motion-safe:animate-fadeUp [animation-delay:500ms] flex items-center gap-3 pt-4 text-slate-500 dark:text-slate-400">
            {info.socials.github && (
              <a
                href={info.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={`${socialLinkClass} hover:text-slate-900 dark:hover:text-white`}
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {info.socials.linkedin && (
              <a
                href={info.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`${socialLinkClass} hover:text-cyan-700 dark:hover:text-cyan-400`}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            {info.socials.twitter && (
              <a
                href={info.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className={`${socialLinkClass} hover:text-sky-600 dark:hover:text-sky-400`}
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
