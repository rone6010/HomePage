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
});
