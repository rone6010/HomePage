import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Projects } from '../src/components/Projects';
import { ProjectModal } from '../src/components/ProjectModal';
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

  it('exposes the active filter with aria-pressed', () => {
    render(<Projects projects={projects} />);
    const all = screen.getByRole('button', { name: '全部專案 (All)' });
    const webApp = screen.getByRole('button', { name: 'Web App' });
    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(webApp).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(webApp);

    expect(webApp).toHaveAttribute('aria-pressed', 'true');
    expect(all).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows how many projects match the current filter', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText(`共 ${projects.length} 個專案`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'AI / Data' }));
    expect(screen.getByText('共 1 個專案')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open Source' }));
    expect(screen.queryByText(/共 \d+ 個專案/)).not.toBeInTheDocument();
  });

  it('gives card action links names that identify the project', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByRole('link', { name: '查看 AI Prompt Studio 原始碼' })).toHaveAttribute(
      'href',
      projects[0].githubUrl,
    );
    expect(screen.getByRole('link', { name: '開啟 AI Prompt Studio Demo' })).toBeInTheDocument();
  });
});

describe('ProjectModal accessibility', () => {
  const openFirstProject = () => {
    render(<Projects projects={projects} />);
    const trigger = screen.getAllByRole('button', { name: /詳細資訊/i })[0];
    trigger.focus();
    fireEvent.click(trigger);
    return trigger;
  };

  it('is labelled by the project title and shows a localized status', () => {
    openFirstProject();
    const dialog = screen.getByRole('dialog', { name: projects[0].title });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(within(dialog).getByText('狀態：已完成')).toBeInTheDocument();
  });

  it('moves focus into the dialog on open and restores it to the trigger on close', () => {
    const trigger = openFirstProject();
    expect(screen.getByRole('button', { name: /關閉視窗/i })).toHaveFocus();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('keeps Tab focus cycling inside the dialog', () => {
    openFirstProject();
    const dialog = screen.getByRole('dialog');
    const closeBtn = screen.getByRole('button', { name: /關閉視窗/i });
    const links = within(dialog).getAllByRole('link');
    const lastLink = links[links.length - 1];

    lastLink.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(closeBtn).toHaveFocus();

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(lastLink).toHaveFocus();
  });

  it('pulls focus back in when it has escaped the dialog', () => {
    openFirstProject();
    (document.activeElement as HTMLElement).blur();

    fireEvent.keyDown(window, { key: 'Tab' });

    expect(screen.getByRole('button', { name: /關閉視窗/i })).toHaveFocus();
  });

  it('does not steal focus when the parent re-renders with a new onClose', () => {
    const { rerender } = render(<ProjectModal project={projects[0]} onClose={() => {}} />);
    const demoLink = screen.getByRole('link', { name: /Live Demo/i });
    demoLink.focus();

    rerender(<ProjectModal project={projects[0]} onClose={() => {}} />);

    expect(demoLink).toHaveFocus();
  });

  it('locks page scroll while open and unlocks it afterwards', () => {
    openFirstProject();
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('button', { name: /關閉視窗/i }));

    expect(document.body.style.overflow).toBe('');
  });
});
