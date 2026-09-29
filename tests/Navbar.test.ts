import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Navbar } from '../src/components/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders brand name and navigation items', () => {
    render(<Navbar name="Kevin Chen" />);
    expect(screen.getByText('Kevin Chen')).toBeInTheDocument();
    expect(screen.getByText('關於我')).toBeInTheDocument();
    expect(screen.getByText('專業技能')).toBeInTheDocument();
    expect(screen.getByText('作品展示')).toBeInTheDocument();
    expect(screen.getByText('經歷')).toBeInTheDocument();
    expect(screen.getByText('聯絡我')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<Navbar name="Kevin Chen" />);
    const themeButtons = screen.getAllByRole('button', { name: /切換主題/i });
    expect(themeButtons.length).toBeGreaterThan(0);
    const themeBtn = themeButtons[0];
    
    fireEvent.click(themeBtn);
    expect(localStorage.getItem('theme')).toBeTruthy();
  });

  it('opens and closes mobile menu when hamburger button is clicked', () => {
    render(<Navbar name="Kevin Chen" />);
    const menuBtn = screen.getByRole('button', { name: /開啟選單/i });
    
    // Initially mobile dropdown links are only in desktop nav
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(1);
    
    // Open mobile menu
    fireEvent.click(menuBtn);
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(2);
    
    // Clicking a mobile menu link closes the dropdown
    const mobileLinks = screen.getAllByRole('link', { name: '關於我' });
    fireEvent.click(mobileLinks[1]);
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(1);
  });

  it('closes the mobile menu with Escape and returns focus to the menu button', () => {
    render(<Navbar name="Kevin Chen" />);
    const menuBtn = screen.getByRole('button', { name: /開啟選單/i });
    fireEvent.click(menuBtn);
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(2);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(1);
    expect(screen.getByRole('button', { name: /開啟選單/i })).toHaveFocus();
  });

  it('closes the mobile menu when clicking outside the header', () => {
    render(<Navbar name="Kevin Chen" />);
    fireEvent.click(screen.getByRole('button', { name: /開啟選單/i }));
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(2);

    // 點選選單內部不應關閉
    fireEvent.pointerDown(screen.getByRole('navigation', { name: '行動版主選單' }));
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(2);

    fireEvent.pointerDown(document.body);
    expect(screen.getAllByRole('link', { name: '關於我' })).toHaveLength(1);
  });

  it('adds a tooltip describing what the theme toggle will do', () => {
    render(<Navbar name="Kevin Chen" />);
    const [themeBtn] = screen.getAllByRole('button', { name: /切換主題/i });
    const before = themeBtn.getAttribute('title');
    expect(before).toMatch(/切換為(淺色|深色)模式/);

    fireEvent.click(themeBtn);
    expect(screen.getAllByRole('button', { name: /切換主題/i })[0].getAttribute('title')).not.toBe(before);
  });
});

describe('Navbar active section', () => {
  const sectionTops: Record<string, number> = {};
  const sections: HTMLElement[] = [];

  let pendingFrames: FrameRequestCallback[] = [];

  // 模擬一次捲動：更新各區塊位置、觸發 scroll，再執行被排程的 rAF callback
  const setTops = (tops: Record<string, number>) => {
    Object.assign(sectionTops, tops);
    act(() => {
      fireEvent.scroll(window);
      const callbacks = pendingFrames;
      pendingFrames = [];
      callbacks.forEach((cb) => cb(0));
    });
  };
  const currentLinks = () =>
    screen.getAllByRole('link', { current: 'location' }).map((el) => el.textContent);

  beforeEach(() => {
    localStorage.clear();
    // rAF 改由測試手動 flush（同步執行會讓 hook 內的節流旗標卡住，與真實瀏覽器行為不同）
    pendingFrames = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      pendingFrames.push(cb);
      return pendingFrames.length;
    });
    for (const id of ['about', 'skills', 'projects', 'experience', 'contact']) {
      const el = document.createElement('section');
      el.id = id;
      el.getBoundingClientRect = () => ({ top: sectionTops[id] ?? 1000 }) as DOMRect;
      document.body.appendChild(el);
      sections.push(el);
      sectionTops[id] = 1000;
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sections.splice(0).forEach((el) => el.remove());
    Reflect.deleteProperty(window, 'scrollY');
  });

  it('marks no link as current while still on the hero', () => {
    render(<Navbar name="Kevin Chen" />);
    expect(screen.queryByRole('link', { current: 'location' })).not.toBeInTheDocument();
  });

  it('marks the last section whose top has passed the header line', () => {
    render(<Navbar name="Kevin Chen" />);

    setTops({ about: -200, skills: 500 });
    expect(currentLinks()).toEqual(['關於我']);

    // 巢狀的 skills 位於 about 內，捲過其頂端後應改為 skills
    setTops({ about: -900, skills: 40, projects: 700 });
    expect(currentLinks()).toEqual(['專業技能']);

    setTops({ projects: 60 });
    expect(currentLinks()).toEqual(['作品展示']);
  });

  it('treats the last section as current when scrolled to the bottom of the page', () => {
    render(<Navbar name="Kevin Chen" />);
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });

    setTops({ about: -3000, skills: -2500, projects: -1800, experience: -900, contact: 400 });

    expect(currentLinks()).toEqual(['聯絡我']);
  });
});
