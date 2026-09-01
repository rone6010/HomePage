# 個人首頁與 Side Project 展示網站實作計畫 (Personal Homepage Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個具備現代科技感、支援深/淺色主題切換、模組化且資料驅動的個人首頁與 Side Projects 作品展示網站，並配置 GitHub Actions 自動發布至 GitHub Pages。

**Architecture:** 採用 React + Vite + TypeScript 作為前端基礎，搭配 Tailwind CSS 實現深淺色毛玻璃質感 UI，Lucide React 提供簡約圖標。全站個人資訊、專案展示、技能樹與經歷均收錄於 `src/data/portfolioData.ts` 集中管理，便於未來隨時擴充與維護。

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Vitest, React Testing Library.

## Global Constraints
- 一率使用繁體中文（繁體中文內容與註釋）。
- 支援響應式設計（RWD，手機至桌面版流暢適配）。
- 支援深色模式 (Dark) 與淺色模式 (Light)，預設讀取 `localStorage` 或系統偏好。
- 專案展示需支援分類篩選（All, Web App, AI / Data, Mobile, Open Source, Tools）與詳細資訊彈窗 (Modal)。
- Email 需支援一鍵複製與 Toast 提示。
- Vite 設定須支援 GitHub Pages 部署路徑。

---

### Task 1: 專案基底建置與相依套件設定 (Project Scaffolding & Setup)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Test: `tests/setup.test.ts`

**Interfaces:**
- Produces: 完整可運行的 React + Vite + Tailwind CSS + Vitest 開發與測試環境。

- [ ] **Step 1: 建立 package.json 並安裝依賴套件**

```json
{
  "name": "personal-homepage",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "jsdom": "^24.1.1",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.3",
    "vite": "^5.4.1",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: 建立 TypeScript 設定檔 (`tsconfig.json`, `tsconfig.node.json`)**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: 建立 Vite 與 Tailwind 設定 (`vite.config.ts`, `tailwind.config.js`, `postcss.config.js`)**

`vite.config.ts`:
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
```

`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        }
      }
    },
  },
  plugins: [],
}
```

`postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: 建立 HTML 與基礎入口 (`index.html`, `src/index.css`, `src/main.tsx`, `src/App.tsx`, `tests/setup.ts`)**

`index.html`:
```html
<!doctype html>
<html lang="zh-TW" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>個人首頁 & 作品集 | Portfolio</title>
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen transition-colors duration-300">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased selection:bg-cyan-500 selection:text-white;
  }
}
```

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center py-10">Personal Homepage</h1>
    </div>
  );
}
```

`tests/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 5: 撰寫基底測試並執行驗證**

`tests/setup.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Setup', () => {
  it('renders application title', () => {
    render(<App />);
    expect(screen.getByText('Personal Homepage')).toBeInTheDocument();
  });
});
```

執行: `npm install && npm test`
預期: PASS

- [ ] **Step 6: Git 提交**
```bash
git add .
git commit -m "chore: scaffold react vite project with tailwindcss and vitest"
```

---

### Task 2: 型別定義與資料設定檔 (Data Models & Portfolio Data)

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/portfolioData.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces: `PersonalInfo`, `SkillCategory`, `Project`, `ExperienceItem` 型別以及 `portfolioData` 物件。

- [ ] **Step 1: 定義 TypeScript 介面 (`src/types/index.ts`)**

```typescript
export interface PersonalInfo {
  name: string;
  chineseName?: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl?: string;
  location: string;
  email: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    blog?: string;
  };
}

export interface SkillItem {
  name: string;
  level?: string;
  iconName?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export type ProjectCategory = 'All' | 'Web App' | 'AI / Data' | 'Mobile' | 'Open Source' | 'Tools';

export interface Project {
  id: string;
  title: string;
  category: 'Web App' | 'AI / Data' | 'Mobile' | 'Open Source' | 'Tools';
  description: string;
  fullDescription: string;
  highlights: string[];
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: 'Completed' | 'In Progress' | 'Maintenance';
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  skills: string[];
}
```

- [ ] **Step 2: 建立集中式資料設定檔 (`src/data/portfolioData.ts`)**

包含豐富的範例個人資料、技能樹、精選 Side Projects（如 AI 助理、全端 SaaS、開發者工具等範例）與工作經歷。

```typescript
import { PersonalInfo, SkillCategory, Project, ExperienceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Kevin Chen",
  chineseName: "陳冠宇",
  title: "Full-Stack & AI Engineer",
  tagline: "專注於構建直覺優雅的 Web 應用與實用的 AI 解決方案",
  bio: "熱愛開源文化與軟體工程，擅長以 React、TypeScript 與 Python 打造高效能、易擴充的數位產品。喜歡探索新技術並將想法轉化為實用的 Side Projects。",
  location: "Taipei, Taiwan",
  email: "kevin.developer@example.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  }
};

export const skillCategories: SkillCategory[] = [
  {
    category: "前端開發 (Frontend)",
    skills: [
      { name: "React / Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Vite / Webpack" },
      { name: "Vue.js" },
    ]
  },
  {
    category: "後端與資料庫 (Backend & DB)",
    skills: [
      { name: "Node.js / Express" },
      { name: "Python / FastAPI" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Prisma ORM" },
    ]
  },
  {
    category: "AI & 開發維運 (AI & DevOps)",
    skills: [
      { name: "OpenAI / Claude API" },
      { name: "LangChain / RAG" },
      { name: "Docker" },
      { name: "GitHub Actions CI/CD" },
      { name: "Git / GitHub" },
    ]
  }
];

export const projects: Project[] = [
  {
    id: "ai-prompt-studio",
    title: "AI Prompt Studio",
    category: "AI / Data",
    description: "專為 Prompt 工程師設計的視覺化除錯與批次評測工作台。",
    fullDescription: "AI Prompt Studio 提供多模型（OpenAI, Claude, Gemini）即時並排比對、版本控管以及自動化品質指標評分，大幅降低提示詞迭代成本與驗估負擔。",
    highlights: [
      "支援多模型並行推論與回應時間/Token 消耗即時統計",
      "具備 Markdown 與 JSON Schema 自動驗證器",
      "支援匯出至 Python/TypeScript SDK 代碼片段"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "OpenAI"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/ai-prompt-studio",
    featured: true,
    status: "Completed"
  },
  {
    id: "dev-flow-hub",
    title: "DevFlow Workspace",
    category: "Web App",
    description: "輕量化開發者每日進度追蹤與靈感看板工具。",
    fullDescription: "專為獨立開發者與遠端工作團隊量身打造的看板管理應用，整合 GitHub PR 狀態、靈感記事本與番茄鐘專注計時器。",
    highlights: [
      "離線優先（Offline-first）架構，支援本機 LocalStorage 與雲端同步",
      "直覺的拖拉式看板操作與快捷鍵導航",
      "暗黑模式與高度自訂視覺主題"
    ],
    tags: ["React", "Tailwind CSS", "Zustand", "Vite"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/dev-flow-hub",
    featured: true,
    status: "Completed"
  },
  {
    id: "git-visualizer-cli",
    title: "Git Visualizer CLI",
    category: "Tools",
    description: "終端機內的互動式 Git 分支與歷史拓撲圖視覺化工具。",
    fullDescription: "透過終端機渲染清晰的 ASCII 與 ANSI 樹狀圖，並支援直接在終端內挑選 commit 執行 rebase 與 cherry-pick。",
    highlights: [
      "零額外依賴的輕量終端工具",
      "支援自訂色彩高亮與快捷搜尋"
    ],
    tags: ["Node.js", "TypeScript", "CLI", "Open Source"],
    githubUrl: "https://github.com/example/git-visualizer-cli",
    featured: false,
    status: "Completed"
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2024 - 現在",
    role: "資深前端 / AI 應用工程師",
    organization: "Tech Innovator Inc.",
    description: "負責核心 SaaS 產品前端架構現代化升級，導入 GenAI 智慧工作流模組，將使用者操作效率提升 40%。",
    skills: ["React", "TypeScript", "Tailwind CSS", "LLM Integration", "CI/CD"]
  },
  {
    id: "exp-2",
    period: "2022 - 2024",
    role: "全端軟體工程師",
    organization: "Digital Solutions Studio",
    description: "參與多個大型 Web 系統與微服務 API 設計開發，主導前端效能最佳化與元件庫建構。",
    skills: ["Node.js", "React", "PostgreSQL", "Docker"]
  }
];
```

- [ ] **Step 3: 撰寫資料驗證測試 (`tests/data.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { personalInfo, skillCategories, projects, experiences } from '../src/data/portfolioData';

describe('Portfolio Data Integrity', () => {
  it('has valid personal information with email and socials', () => {
    expect(personalInfo.name).toBeTruthy();
    expect(personalInfo.email).toContain('@');
    expect(personalInfo.socials.github).toBeDefined();
  });

  it('contains skill categories with skills list', () => {
    expect(skillCategories.length).toBeGreaterThan(0);
    skillCategories.forEach(cat => {
      expect(cat.skills.length).toBeGreaterThan(0);
    });
  });

  it('contains valid projects with tags and categories', () => {
    expect(projects.length).toBeGreaterThan(0);
    projects.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it('contains valid experiences with periods', () => {
    expect(experiences.length).toBeGreaterThan(0);
    experiences.forEach(e => {
      expect(e.period).toBeTruthy();
      expect(e.role).toBeTruthy();
    });
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 4: Git 提交**
```bash
git add src/types/ src/data/ tests/data.test.ts
git commit -m "feat: add data models and portfolio configuration"
```

---

### Task 3: 深淺色主題 Hook 與頂部導航列 (Theme Hook & Navbar)

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/Navbar.tsx`
- Test: `tests/Navbar.test.ts`

**Interfaces:**
- Consumes: `personalInfo` from `src/data/portfolioData.ts`
- Produces: `useTheme` hook, `Navbar` component.

- [ ] **Step 1: 實作主題管理 Hook (`src/hooks/useTheme.ts`)**

支援讀取 `localStorage` 或作業系統偏好，切換 `document.documentElement` 的 `dark` class。

```typescript
import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: 實作導航列元件 (`src/components/Navbar.tsx`)**

包含桌面版與手機版選單、毛玻璃背景、各區塊錨點連結與主題切換按鈕。

```tsx
import { useState } from 'react';
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  name: string;
}

export function Navbar({ name }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '關於我', href: '#about' },
    { label: '專業技能', href: '#skills' },
    { label: '作品展示', href: '#projects' },
    { label: '經歷', href: '#experience' },
    { label: '聯絡我', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="切換主題"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="切換主題"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="開啟選單"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: 撰寫 Navbar 測試 (`tests/Navbar.test.ts`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../src/components/Navbar';

describe('Navbar Component', () => {
  it('renders brand name and navigation items', () => {
    render(<Navbar name="Kevin Chen" />);
    expect(screen.getByText('Kevin Chen')).toBeInTheDocument();
    expect(screen.getByText('關於我')).toBeInTheDocument();
    expect(screen.getByText('作品展示')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<Navbar name="Kevin Chen" />);
    const themeBtn = screen.getAllByRole('button', { name: /切換主題/i })[0];
    fireEvent.click(themeBtn);
    // documentElement should contain dark class or have toggled
    expect(localStorage.getItem('theme')).toBeTruthy();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 4: Git 提交**
```bash
git add src/hooks/ src/components/Navbar.tsx tests/Navbar.test.ts
git commit -m "feat: implement theme hook and responsive navbar component"
```

---

### Task 4: Hero 區塊與個人核心標語 (Hero Section)

**Files:**
- Create: `src/components/Hero.tsx`
- Test: `tests/Hero.test.ts`

**Interfaces:**
- Consumes: `PersonalInfo` from `src/types`
- Produces: `Hero` component.

- [ ] **Step 1: 實作 Hero 區塊元件 (`src/components/Hero.tsx`)**

包含背景光暈裝飾、個人頭像 / Code badge、標語、CTA 按鈕與社群快速連結。

```tsx
import { Github, Linkedin, Twitter, Mail, ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';
import { PersonalInfo } from '../types';

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
                <Github className="w-5 h-5" />
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
                <Linkedin className="w-5 h-5" />
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
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 撰寫 Hero 測試 (`tests/Hero.test.ts`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../src/components/Hero';
import { personalInfo } from '../src/data/portfolioData';

describe('Hero Component', () => {
  it('renders hero title and personal info', () => {
    render(<Hero info={personalInfo} />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.title)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /探索 Side Projects/i })).toBeInTheDocument();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 3: Git 提交**
```bash
git add src/components/Hero.tsx tests/Hero.test.ts
git commit -m "feat: implement hero section with modern styling and social links"
```

---

### Task 5: 關於我與專業技能樹區塊 (About & Skills Section)

**Files:**
- Create: `src/components/About.tsx`
- Test: `tests/About.test.ts`

**Interfaces:**
- Consumes: `PersonalInfo`, `SkillCategory[]`
- Produces: `About` component.

- [ ] **Step 1: 實作 About 與技能樹元件 (`src/components/About.tsx`)**

```tsx
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
```

- [ ] **Step 2: 撰寫 About 測試 (`tests/About.test.ts`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../src/components/About';
import { personalInfo, skillCategories } from '../src/data/portfolioData';

describe('About Component', () => {
  it('renders bio and skill categories', () => {
    render(<About info={personalInfo} categories={skillCategories} />);
    expect(screen.getByText('關於我與技術專長')).toBeInTheDocument();
    expect(screen.getByText('核心技術棧 (Tech Stack)')).toBeInTheDocument();
    expect(screen.getByText('前端開發 (Frontend)')).toBeInTheDocument();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 3: Git 提交**
```bash
git add src/components/About.tsx tests/About.test.ts
git commit -m "feat: implement about and skills section"
```

---

### Task 6: Side Projects 展示與篩選彈窗 (Projects, Card & Modal)

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectModal.tsx`
- Create: `src/components/Projects.tsx`
- Test: `tests/Projects.test.ts`

**Interfaces:**
- Consumes: `Project[]`, `ProjectCategory`
- Produces: `Projects`, `ProjectCard`, `ProjectModal` components.

- [ ] **Step 1: 實作專案卡片元件 (`src/components/ProjectCard.tsx`)**

```tsx
import { ExternalLink, Github, Info, Star } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300">
      {/* Top Banner / Placeholder Gradient */}
      <div className="relative h-44 w-full bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 p-6 flex flex-col justify-between overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-cyan-300 backdrop-blur border border-white/10">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-300" />
              Featured
            </span>
          )}
        </div>

        <div className="z-10">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
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
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <Info className="w-3.5 h-3.5" />
            <span>詳細資訊</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="查看原始碼"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="開啟 Demo"
                className="p-2 rounded-lg text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 實作專案詳情彈窗 (`src/components/ProjectModal.tsx`)**

```tsx
import { X, ExternalLink, Github, CheckCircle, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="關閉視窗"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              {project.category}
            </span>
            {project.status && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                狀態：{project.status}
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{project.fullDescription}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              專案核心亮點 (Key Highlights)
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Tag className="w-3.5 h-3.5" />
            <span>使用技術</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm shadow-md transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>開啟即時 Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition"
            >
              <Github className="w-4 h-4" />
              <span>查看 GitHub 原始碼</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 實作專案展示區塊與篩選列 (`src/components/Projects.tsx`)**

```tsx
import { useState } from 'react';
import { FolderGit2 } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Web App', 'AI / Data', 'Tools', 'Open Source'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            精選 Side Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            點選卡片可查看架構詳情與線上 Demo，未來將持續更新更多好玩的獨立作品。
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'All' ? '全部專案 (All)' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            此分類下目前暫無專案，敬請期待！
          </div>
        )}
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
```

- [ ] **Step 4: 撰寫 Projects 測試 (`tests/Projects.test.ts`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from '../src/components/Projects';
import { projects } from '../src/data/portfolioData';

describe('Projects Component', () => {
  it('renders project list and filter buttons', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('精選 Side Projects')).toBeInTheDocument();
    expect(screen.getByText('AI Prompt Studio')).toBeInTheDocument();
  });

  it('opens details modal when clicking details button', () => {
    render(<Projects projects={projects} />);
    const detailBtns = screen.getAllByRole('button', { name: /詳細資訊/i });
    fireEvent.click(detailBtns[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 5: Git 提交**
```bash
git add src/components/ProjectCard.tsx src/components/ProjectModal.tsx src/components/Projects.tsx tests/Projects.test.ts
git commit -m "feat: implement side projects showcase with filtering and modal"
```

---

### Task 7: 經歷時間軸、聯絡我與頁尾 (Experience, Contact & Footer)

**Files:**
- Create: `src/components/Experience.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`
- Test: `tests/Contact.test.ts`

**Interfaces:**
- Consumes: `ExperienceItem[]`, `PersonalInfo`
- Produces: `Experience`, `Contact`, `Footer` components.

- [ ] **Step 1: 實作經歷時間軸元件 (`src/components/Experience.tsx`)**

```tsx
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
            <Briefcase className="w-4 h-4" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            經歷與里程碑
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-cyan-500 group-hover:scale-125 transition-transform" />

              <div className="space-y-2 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role} · <span className="text-cyan-600 dark:text-cyan-400 font-medium">{exp.organization}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 實作聯絡我元件 (含 Email 一鍵複製 Toast, `src/components/Contact.tsx`)**

```tsx
import { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { PersonalInfo } from '../types';

interface ContactProps {
  info: PersonalInfo;
}

export function Contact({ info }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
```

- [ ] **Step 3: 實作頁尾元件 (`src/components/Footer.tsx`)**

```tsx
import { PersonalInfo } from '../types';

interface FooterProps {
  info: PersonalInfo;
}

export function Footer({ info }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p>© {currentYear} {info.name}. All rights reserved.</p>
        <p className="text-slate-400 dark:text-slate-500">
          Built with React & Tailwind CSS. Hosted on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: 撰寫 Contact 測試 (`tests/Contact.test.ts`)**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from '../src/components/Contact';
import { personalInfo } from '../src/data/portfolioData';

describe('Contact Component', () => {
  it('renders contact card with email', () => {
    render(<Contact info={personalInfo} />);
    expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
  });

  it('handles copy email button click', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<Contact info={personalInfo} />);
    const copyBtn = screen.getByRole('button', { name: /複製 Email 地址/i });
    fireEvent.click(copyBtn);
    expect(screen.getByText(/已複製 Email 至剪貼簿/i)).toBeInTheDocument();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 5: Git 提交**
```bash
git add src/components/Experience.tsx src/components/Contact.tsx src/components/Footer.tsx tests/Contact.test.ts
git commit -m "feat: implement experience timeline, contact and footer components"
```

---

### Task 8: 主頁面組裝整合 (App Integration)

**Files:**
- Modify: `src/App.tsx`
- Test: `tests/App.test.ts`

**Interfaces:**
- Consumes: All components from Task 3 to Task 7 and `portfolioData`.
- Produces: Complete personal homepage application.

- [ ] **Step 1: 整合所有區塊至 `src/App.tsx`**

```tsx
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { personalInfo, skillCategories, projects, experiences } from './data/portfolioData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
      <Navbar name={personalInfo.name} />
      <main className="flex-1">
        <Hero info={personalInfo} />
        <About info={personalInfo} categories={skillCategories} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact info={personalInfo} />
      </main>
      <Footer info={personalInfo} />
    </div>
  );
}
```

- [ ] **Step 2: 撰寫全站整合測試 (`tests/App.test.ts`)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Integration', () => {
  it('renders all sections successfully', () => {
    render(<App />);
    expect(screen.getByText('關於我與技術專長')).toBeInTheDocument();
    expect(screen.getByText('精選 Side Projects')).toBeInTheDocument();
    expect(screen.getByText('經歷與里程碑')).toBeInTheDocument();
    expect(screen.getByText('與我聯繫')).toBeInTheDocument();
  });
});
```

執行: `npm test`
預期: PASS

- [ ] **Step 3: Git 提交**
```bash
git add src/App.tsx tests/App.test.ts
git commit -m "feat: integrate all homepage sections into main App"
```

---

### Task 9: GitHub Actions 自動部署工作流與建置驗證 (CI/CD & Deployment Verification)

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Test: Build output verification

- [ ] **Step 1: 建立 GitHub Actions CI/CD 配置 (`.github/workflows/deploy.yml`)**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run Tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 建立清楚好用的 `README.md`**

說明如何本機啟動、如何更新 `src/data/portfolioData.ts` 以及如何開啟 GitHub Pages 設定。

```markdown
# 個人首頁與 Side Project 展示網站

現代化、響應式且支援深/淺色主題切換的個人作品集首頁，專為託管於 **GitHub Pages** 所設計。

## 🌟 核心特色
- **資料驅動 (Data-Driven)**：只需編輯 `src/data/portfolioData.ts` 即可輕鬆更新個人資訊、技術技能、Side Projects 與經歷。
- **Side Projects 展區**：支援多分類即時篩選、Demo 與 Repo 快速連結、以及卡片詳細資訊彈窗。
- **深淺色主題**：自動記憶偏好並支援系統預設。
- **GitHub Actions 自動部署**：推送到 `main` 分支自動建置並發布至 GitHub Pages。

## 🚀 本機開發指南
```bash
# 安裝依賴
npm install

# 啟動本機開發伺服器 (http://localhost:5173)
npm run dev

# 執行自動化測試
npm test

# 建立生產環境建置
npm run build
```

## 📝 如何自訂個人資料與專案
編輯 `src/data/portfolioData.ts`：
1. 修改 `personalInfo`：個人姓名、職稱、自介、社群連結。
2. 修改 `skillCategories`：技術標籤分類與清單。
3. 修改 `projects`：新增、修改您的 Side Projects（包含 Demo 連結、GitHub Repo、標籤與亮點）。
4. 修改 `experiences`：經歷時間軸。

## 🌐 如何啟用 GitHub Pages
1. 將本專案 Push 至 GitHub Repo。
2. 前往 GitHub Repo 的 **Settings** -> **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 選擇 **GitHub Actions**。
4. 下次 push 到 `main` 分支時即會自動部署上線！
```

- [ ] **Step 3: 執行完整建置與測試驗證**
執行: `npm test && npm run build`
預期: 所有測試通過，成功輸出 `dist/` 目錄。

- [ ] **Step 4: Git 提交**
```bash
git add .github/workflows/deploy.yml README.md
git commit -m "ci: add GitHub Actions workflow and deployment README"
```
