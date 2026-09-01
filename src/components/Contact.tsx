import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Send, Sparkles } from 'lucide-react';
import { PersonalInfo } from '../types';

interface ContactProps {
  info: PersonalInfo;
}

export function Contact({ info }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(info.email)
        .then(() => {
          setCopied(true);
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          // Fallback if clipboard write fails
          setCopied(false);
        });
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            與我聯繫
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm sm:text-base">
            無論是 Side Project 合作、技術交流或任何有趣的點子，都非常歡迎隨時來信！
          </p>
        </div>

        {/* Contact Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-950/80 backdrop-blur-xl shadow-xl space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Direct Email</span>
            <p className="text-xl sm:text-2xl font-mono font-semibold text-cyan-600 dark:text-cyan-400 select-all">
              {info.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-semibold text-sm shadow-md transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '已複製 Email 至剪貼簿！' : '複製 Email 地址'}</span>
            </button>

            <a
              href={`mailto:${info.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
            >
              <Send className="w-4 h-4" />
              <span>直接寄信</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
