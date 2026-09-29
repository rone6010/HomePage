# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

純前端靜態站，部署於 GitHub Pages。文件與 UI 文案使用繁體中文。

## 指令

```bash
npx vitest run tests/Projects.test.ts   # 單一測試檔
npx vitest run -t "測試名稱"             # 依名稱篩選
```

`npm test` 是單次執行（非 watch）。沒有設定 lint；型別錯誤會讓 `npm run build`（先跑 `tsc`）失敗。

## 架構

- **資料驅動**：所有內容（`personalInfo`、`skillCategories`、`projects`、`experiences`）集中在 `src/data/portfolioData.ts`，型別定義在 `src/types/index.ts`。`src/App.tsx` 只負責把這些資料以 props 傳給各區塊元件。更新內容改資料檔，不要把文案寫進元件。
- **專案分類篩選**：`Projects.tsx` 以預設分類清單加上 `projects` 資料中出現的分類動態組出篩選鈕。新增分類時，`ProjectCategory`（`src/types/index.ts`）與 `Project.category` 型別要一併更新。
- **深淺色主題**：`src/hooks/useTheme.ts` 讀取 `localStorage['theme']`，其次系統 `prefers-color-scheme`，並在 `<html>` 上切換 `dark` class（Tailwind class 模式）。只有使用者手動切換時才寫入 `localStorage`，未選擇時跟隨系統變化。`index.html` 的 `<head>` 內有一段內嵌腳本，會在首次繪製前套用同一套判斷以避免深色模式閃白；修改判斷邏輯時兩處要一起改。
- **部署路徑**：`vite.config.ts` 設 `base: './'` 以支援 GitHub Pages 子路徑，不要改成絕對路徑。
- **CI**：push 到 `main` 時測試失敗會擋住部署。

## 文件

`docs/superpowers/` 內的 spec 與 plan 是最初的設計與實作計畫，屬歷史紀錄；細節（例如分類清單）可能已與現行程式碼不同，以程式碼為準。
