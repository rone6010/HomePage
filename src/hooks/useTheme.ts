import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const THEME_COLORS: Record<Theme, string> = { light: '#f8fafc', dark: '#020617' };

// 存取 localStorage 可能丟出例外（隱私模式、封鎖網站資料），一律容錯
function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // 無法儲存時仍可在本次瀏覽中切換
  }
}

function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  }
  return 'dark';
}

// 初始判斷邏輯需與 index.html 的防閃爍內嵌腳本保持一致
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? getSystemTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  // 使用者尚未手動選擇時，跟隨系統主題的變化
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(DARK_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (readStoredTheme() === null) setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // 只在使用者主動切換時才記住偏好，否則會把「系統當下的主題」誤存成使用者的選擇
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    writeStoredTheme(next);
  };

  return { theme, toggleTheme };
}
