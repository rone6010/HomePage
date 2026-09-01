# 個人首頁與 Side Project 展示網站設計規格書 (Personal Homepage & Portfolio Spec)

## 1. 專案目標與定位
本專案旨在為使用者打造一個現代化、美觀、高擴充性的個人首頁，託管於 **GitHub Pages**。
主要功能包括：
- 個人品牌形象展示（Hero、簡介、技能樹、個人時間軸經歷）
- 個人 Side Projects 精選與完整展示（分類過濾、技術標籤、Demo/GitHub 快速連結、專案詳細介紹彈窗）
- 便捷的聯絡管道（Email 一鍵複製 Toast、各大社群入口）
- 資料驅動架構（Data-driven）：所有文字、專案、技能、經歷均收攏於單一設定檔，後續維護與新增專案極度容易。

---

## 2. 技術架構與依賴 (Tech Stack)
* **核心框架**：React 18 + TypeScript + Vite
* **樣式與主題**：Tailwind CSS (支援深色 Dark Mode / 淺色 Light Mode 切換、毛玻璃質感 `backdrop-blur`、響應式 RWD)
* **圖標庫**：`lucide-react` (現代簡約向量圖標)
* **動態與互動**：`framer-motion` (流暢的入場動畫、卡片 Hover 微動效、彈窗平滑切換)
* **部署與 CI/CD**：GitHub Actions 自動建置發布至 GitHub Pages

---

## 3. 目錄與模組結構 (Project Structure)
```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自動化 CI/CD 工作流
├── public/
│   ├── favicon.svg             # 網站圖示
│   └── images/                 # 預設專案圖片與頭像
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # 頂部導航列（深淺色切換、平滑滾動錨點）
│   │   ├── Hero.tsx            # Hero 視覺核心（標語、CTA、社群連結）
│   │   ├── About.tsx           # 關於我 & 專業技能分類群組
│   │   ├── Projects.tsx        # Side Projects 作品區（分類標籤過濾）
│   │   ├── ProjectCard.tsx     # 單一專案卡片元件
│   │   ├── ProjectModal.tsx    # 專案詳情彈窗（痛點、亮點、詳細資訊）
│   │   ├── Experience.tsx      # 個人經歷時間軸 (Timeline)
│   │   ├── Contact.tsx         # 聯絡區塊（一鍵複製 Email + 社群）
│   │   └── Footer.tsx          # 頁尾
│   ├── data/
│   │   └── portfolioData.ts    # 🌟 核心資料設定檔（集中管理個人資訊與專案）
│   ├── types/
│   │   └── index.ts            # TypeScript 介面定義 (Profile, Project, Skill, Experience)
│   ├── hooks/
│   │   └── useTheme.ts         # 深色/淺色主題管理 Hook (儲存於 localStorage)
│   ├── App.tsx                 # 主頁面組合與佈局
│   ├── main.tsx                # React 進入點
│   └── index.css               # 全域樣式與 Tailwind 基礎配置
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 4. 資料模型設計 (Data Models - `src/types/index.ts`)

```typescript
export interface PersonalInfo {
  name: string;
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

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

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

---

## 5. 核心功能與頁面區塊規格 (Functional Requirements)

### 5.1 導航與主題切換 (Navbar)
- **固定頂部**：帶有玻璃擬態半透明背景與模糊效果。
- **導航項目**：關於我 (About)、技能 (Skills)、Side Projects (Projects)、經歷 (Experience)、聯絡我 (Contact)。
- **主題切換**：深色模式 (Dark Mode) 與淺色模式 (Light Mode) 快速切換，預設跟隨系統偏好並記憶於 `localStorage`。
- **行動版支援**：右側漢堡選單，點擊展開平滑過渡選單。

### 5.2 Hero 區塊
- **視覺亮點**：現代科技感背景微光（Gradients / Glow effects）、動態淡入。
- **自介文字**：親切問候、姓名、職稱標籤、個人座右銘/一句話介紹。
- **快速操作**：
  - 「探索專案 (Explore Projects)」按鈕（平滑滾動至專案區）。
  - 「聯絡我 (Contact Me)」按鈕。
  - 社群圖標快速連結（GitHub、LinkedIn、Email 等）。

### 5.3 關於我與技能樹 (About & Skills)
- **關於我卡片**：結構化個人背景介紹、熱情所在與技術追求。
- **技能分類矩陣**：
  - 前端技能（React, Vue, TypeScript, Tailwind CSS, Next.js 等）
  - 後端與雲端（Node.js, Python, PostgreSQL, Docker, AWS 等）
  - AI & 現代工具（AI Prompting/APIs, Git, CI/CD, Figma 等）
  - 支援懸停亮起反饋。

### 5.4 Side Projects 作品展示 (核心功能)
- **分類篩選列 (Category Filters)**：提供「全部 (All)」、「Web App」、「AI / Data」、「Open Source」、「Tools」等分類按鈕，點擊即時篩選。
- **專案卡片 (Project Card)**：
  - 專案封面圖（若無圖片則自動套用具科技質感的幾何代碼漸層佔位圖）。
  - 專案標題、簡介、技術標籤（Badges）。
  - 底部操作按鈕：Demo 連結、GitHub 原始碼連結、「查看詳情 (Details)」。
- **專案詳情彈窗 (Project Modal)**：
  - 點擊卡片或「查看詳情」開啟彈窗。
  - 呈現完整專案介紹、解決的核心問題、技術架構亮點清單、目前狀態等。

### 5.5 經歷時間軸 (Experience Timeline)
- 垂直時間軸，清晰標示時間區段、組織機構、職務角色、核心貢獻與技能關鍵字。

### 5.6 聯絡我與頁尾 (Contact & Footer)
- 提供 Email 點擊**一鍵複製至剪貼簿**並顯示 Toast 提示（「Email 已複製到剪貼簿！」）。
- 社群連結清單與直接發信連結 (`mailto:`)。
- 簡約頁尾，標註個人版權聲明與技術棧資訊。

---

## 6. GitHub Pages 部署流程 (CI/CD)
1. 在 `vite.config.ts` 設定 `base` 路徑（支援 `base: './'` 相對路徑或自訂 Repo 名稱）。
2. 在 `.github/workflows/deploy.yml` 建立 GitHub Actions 工作流：
   - 觸發條件：`push` 到 `main` 分支。
   - 步驟：安裝 Node.js 依賴 -> `npm run build` -> 使用 `actions/deploy-pages` 自動發布至 GitHub Pages。
