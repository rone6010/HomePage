import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Send, Sparkles, AlertCircle } from 'lucide-react';
import { PersonalInfo } from '../types';
import { SectionHeading } from './SectionHeading';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons';

interface ContactProps {
  info: PersonalInfo;
}

type CopyState = 'idle' | 'copied' | 'failed';

const copyLabels: Record<CopyState, string> = {
  idle: '複製 Email 地址',
  copied: '已複製 Email 至剪貼簿！',
  failed: '複製失敗，請手動複製',
};

export function Contact({ info }: ContactProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timerRef = useRef<number | null>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showCopyState = (state: CopyState) => {
    setCopyState(state);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState('idle'), 2500);
  };

  // 剪貼簿不可用（非 HTTPS、權限被拒等）時，選取 Email 文字讓使用者可直接按 Ctrl/⌘+C
  const selectEmailText = () => {
    const selection = window.getSelection();
    if (!selection || !emailRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(emailRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleCopyEmail = async () => {
    try {
      if (!navigator?.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(info.email);
      showCopyState('copied');
    } catch {
      selectEmailText();
      showCopyState('failed');
    }
  };

  const socialLinks = [
    { label: 'GitHub', href: info.socials.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: info.socials.linkedin, Icon: LinkedinIcon },
    { label: 'X / Twitter', href: info.socials.twitter, Icon: TwitterIcon },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          id="contact-heading"
          icon={Sparkles}
          eyebrow="Get In Touch"
          title="與我聯繫"
          description="無論是 Side Project 合作、技術交流或任何有趣的點子，都非常歡迎隨時來信！"
        />

        {/* Contact Card */}
        <div className="p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-950/80 backdrop-blur-xl shadow-xl space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">Direct Email</span>
            <p
              ref={emailRef}
              className="text-xl sm:text-2xl font-mono font-semibold text-cyan-700 dark:text-cyan-400 select-all break-all"
            >
              {info.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-w-[15rem] items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-semibold text-sm shadow-md transition"
            >
              {copyState === 'copied' && <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" aria-hidden="true" />}
              {copyState === 'failed' && <AlertCircle className="w-4 h-4 text-amber-400 dark:text-amber-600" aria-hidden="true" />}
              {copyState === 'idle' && <Copy className="w-4 h-4" aria-hidden="true" />}
              <span>{copyLabels[copyState]}</span>
            </button>

            <a
              href={`mailto:${info.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>直接寄信</span>
            </a>
          </div>

          {/* 供螢幕閱讀器朗讀複製結果；文字刻意與按鈕標籤不同，避免重複 */}
          <span role="status" className="sr-only">
            {copyState === 'copied' ? 'Email 已複製' : copyState === 'failed' ? '複製失敗，Email 已選取' : ''}
          </span>

          {socialLinks.length > 0 && (
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <p className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">
                Find Me Online
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-cyan-700/40 dark:hover:border-cyan-400/40 hover:text-cyan-700 dark:hover:text-cyan-400 transition"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
