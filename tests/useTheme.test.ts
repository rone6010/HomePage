import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../src/hooks/useTheme';

type ChangeListener = (e: { matches: boolean }) => void;

function mockSystemTheme(initialDark: boolean) {
  let listener: ChangeListener | null = null;
  const mql = {
    matches: initialDark,
    addEventListener: vi.fn((_type: string, l: ChangeListener) => {
      listener = l;
    }),
    removeEventListener: vi.fn(() => {
      listener = null;
    }),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return {
    mql,
    setSystemDark(dark: boolean) {
      mql.matches = dark;
      listener?.({ matches: dark });
    },
  };
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.head.replaceChildren();
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#f8fafc';
    document.head.appendChild(meta);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(window, 'matchMedia');
  });

  it('prefers the saved choice over the system theme', () => {
    mockSystemTheme(true);
    localStorage.setItem('theme', 'light');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('falls back to the system theme when nothing is saved', () => {
    mockSystemTheme(true);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('does not save a preference until the user toggles', () => {
    mockSystemTheme(false);

    const { result } = renderHook(() => useTheme());
    expect(localStorage.getItem('theme')).toBeNull();

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#020617');
  });

  it('follows system changes until the user makes an explicit choice', () => {
    const system = mockSystemTheme(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => system.setSystemDark(true));
    expect(result.current.theme).toBe('dark');

    // 使用者手動切回淺色後，就不再被系統變化覆蓋
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    act(() => system.setSystemDark(true));
    expect(result.current.theme).toBe('light');
  });

  it('stops listening for system changes on unmount', () => {
    const system = mockSystemTheme(false);
    const { unmount } = renderHook(() => useTheme());

    unmount();

    expect(system.mql.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('keeps working when localStorage is blocked', () => {
    mockSystemTheme(false);
    vi.spyOn(window.Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(window.Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });
});
