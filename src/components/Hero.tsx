import { Mail, ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';
import { PersonalInfo } from '../types';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

interface HeroProps {
  info: PersonalInfo;
}

export function Hero({ info }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/15 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs font-semibold tracking-wide animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for Side Projects & Collaboration</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 bg-clip-text text-transparent">{info.name}</span>
            {info.chineseName && <span className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400 font-normal ml-3">({info.chineseName})</span>}
          </h1>

          {/* Title & Tagline */}
          <p className="text-lg sm:text-xl font-medium text-cyan-600 dark:text-cyan-400">
            {info.title}
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {info.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
          <div className="flex items-center gap-4 pt-4 text-slate-500 dark:text-slate-400">
            {info.socials.github && (
              <a
                href={info.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition"
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
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-slate-400 dark:hover:border-slate-600 transition"
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
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:text-sky-500 dark:hover:text-sky-400 hover:border-slate-400 dark:hover:border-slate-600 transition"
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
