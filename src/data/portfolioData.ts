import { PersonalInfo, SkillCategory, Project, ExperienceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Kevin Lin",
  chineseName: "志遠",
  title: "Full-Stack & AI Engineer",
  tagline: "專注於構建直覺優雅的 Web 應用與實用的 AI 解決方案",
  bio: "熱愛開源文化與軟體工程，擅長以 React、TypeScript 與 Python 打造高效能、易擴充的數位產品。喜歡探索新技術並將想法轉化為實用的 Side Projects。",
  location: "Taipei, Taiwan",
  email: "rone6010@gmail.com",
  socials: {
    github: "https://github.com/rone6010",
    linkedin: "https://linkedin.com/in/rone6010",
    twitter: "https://x.com/rone6010",
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
