# 個人首頁與 Side Project 展示網站(for GitHub)

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
