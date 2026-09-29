import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Contact } from '../src/components/Contact';
import { Experience } from '../src/components/Experience';
import { Footer } from '../src/components/Footer';
import { personalInfo, experiences } from '../src/data/portfolioData';

describe('Contact Component', () => {
  it('renders contact card with email', () => {
    render(<Contact info={personalInfo} />);
    expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /直接寄信/i })).toHaveAttribute('href', `mailto:${personalInfo.email}`);
  });

  it('handles copy email button click', async () => {
    const writeTextMock = vi.fn().mockImplementation(() => Promise.resolve());
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<Contact info={personalInfo} />);
    const copyBtn = screen.getByRole('button', { name: /複製 Email 地址/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalledWith(personalInfo.email);
    expect(await screen.findByText(/已複製 Email 至剪貼簿/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Email 已複製');
  });

  it('reports failure and selects the email when the clipboard write is rejected', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    });

    render(<Contact info={personalInfo} />);
    fireEvent.click(screen.getByRole('button', { name: /複製 Email 地址/i }));

    expect(await screen.findByText('複製失敗，請手動複製')).toBeInTheDocument();
    expect(screen.queryByText(/已複製 Email 至剪貼簿/i)).not.toBeInTheDocument();
    expect(window.getSelection()?.toString()).toBe(personalInfo.email);
    expect(screen.getByRole('status')).toHaveTextContent('複製失敗');
  });

  it('reports failure when the Clipboard API is unavailable', async () => {
    Object.assign(navigator, { clipboard: undefined });

    render(<Contact info={personalInfo} />);
    fireEvent.click(screen.getByRole('button', { name: /複製 Email 地址/i }));

    expect(await screen.findByText('複製失敗，請手動複製')).toBeInTheDocument();
  });

  it('links to each configured social profile', () => {
    render(<Contact info={personalInfo} />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', personalInfo.socials.github);
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', personalInfo.socials.linkedin);
    expect(screen.getByRole('link', { name: /Twitter/i })).toHaveAttribute('href', personalInfo.socials.twitter);
  });

  it('omits the social section when no profiles are configured', () => {
    render(<Contact info={{ ...personalInfo, socials: {} }} />);
    expect(screen.queryByText('Find Me Online')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /GitHub/i })).not.toBeInTheDocument();
  });
});

describe('Experience Component', () => {
  it('renders timeline with experience items', () => {
    render(<Experience experiences={experiences} />);
    expect(screen.getByText('經歷與里程碑')).toBeInTheDocument();
    expect(screen.getByText('Career Path')).toBeInTheDocument();
    
    experiences.forEach((exp) => {
      expect(screen.getByText(new RegExp(exp.organization, 'i'))).toBeInTheDocument();
      expect(screen.getByText(exp.period)).toBeInTheDocument();
      expect(screen.getByText(exp.description)).toBeInTheDocument();
    });
  });
});

describe('Footer Component', () => {
  it('renders footer copyright and info', () => {
    render(<Footer info={personalInfo} />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${currentYear}.*${personalInfo.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Built with React & Tailwind CSS/i)).toBeInTheDocument();
  });

  it('offers a link back to the top of the page', () => {
    render(<Footer info={personalInfo} />);
    expect(screen.getByRole('link', { name: /回到頂端/ })).toHaveAttribute('href', '#');
  });
});
