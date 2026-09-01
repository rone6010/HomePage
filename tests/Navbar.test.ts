import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
});
