import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from '../src/components/Projects';
import { projects } from '../src/data/portfolioData';

describe('Projects Component', () => {
  it('renders project list and filter buttons', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('精選 Side Projects')).toBeInTheDocument();
    expect(screen.getByText('Featured Portfolio')).toBeInTheDocument();
    expect(screen.getByText('AI Prompt Studio')).toBeInTheDocument();
    expect(screen.getByText('DevFlow Workspace')).toBeInTheDocument();
    expect(screen.getByText('Git Visualizer CLI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '全部專案 (All)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Web App' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI / Data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tools' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open Source' })).toBeInTheDocument();
  });

  it('filters projects when category button is clicked', () => {
    render(<Projects projects={projects} />);

    // Filter to 'AI / Data'
    fireEvent.click(screen.getByRole('button', { name: 'AI / Data' }));
    expect(screen.getByText('AI Prompt Studio')).toBeInTheDocument();
    expect(screen.queryByText('DevFlow Workspace')).not.toBeInTheDocument();
    expect(screen.queryByText('Git Visualizer CLI')).not.toBeInTheDocument();

    // Filter to 'Open Source' which has no projects in default list
    fireEvent.click(screen.getByRole('button', { name: 'Open Source' }));
    expect(screen.getByText('此分類下目前暫無專案，敬請期待！')).toBeInTheDocument();

    // Back to 'All'
    fireEvent.click(screen.getByRole('button', { name: '全部專案 (All)' }));
    expect(screen.getByText('AI Prompt Studio')).toBeInTheDocument();
    expect(screen.getByText('DevFlow Workspace')).toBeInTheDocument();
    expect(screen.getByText('Git Visualizer CLI')).toBeInTheDocument();
  });

  it('opens details modal when clicking details button and closes it', () => {
    render(<Projects projects={projects} />);
    const detailBtns = screen.getAllByRole('button', { name: /詳細資訊/i });
    fireEvent.click(detailBtns[0]);
    
    // Modal is opened
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('專案核心亮點 (Key Highlights)')).toBeInTheDocument();
    expect(screen.getByText('使用技術')).toBeInTheDocument();
    expect(screen.getByText('支援多模型並行推論與回應時間/Token 消耗即時統計')).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /關閉視窗/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when backdrop is clicked', () => {
    render(<Projects projects={projects} />);
    const detailBtns = screen.getAllByRole('button', { name: /詳細資訊/i });
    fireEvent.click(detailBtns[0]);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click backdrop (dialog itself)
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when Escape key is pressed', () => {
    render(<Projects projects={projects} />);
    const detailBtns = screen.getAllByRole('button', { name: /詳細資訊/i });
    fireEvent.click(detailBtns[0]);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays featured badge on featured projects', () => {
    render(<Projects projects={projects} />);
    const featuredBadges = screen.getAllByText('Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });
});
