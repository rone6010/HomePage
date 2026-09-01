import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../src/components/About';
import { personalInfo, skillCategories } from '../src/data/portfolioData';

describe('About Component', () => {
  it('renders bio and skill categories', () => {
    render(<About info={personalInfo} categories={skillCategories} />);
    expect(screen.getByText('關於我與技術專長')).toBeInTheDocument();
    expect(screen.getByText('核心技術棧 (Tech Stack)')).toBeInTheDocument();
    expect(screen.getByText('前端開發 (Frontend)')).toBeInTheDocument();
  });

  it('renders personal info details including name, bio, location, and email', () => {
    render(<About info={personalInfo} categories={skillCategories} />);
    expect(screen.getByText(`Hello! 我是 ${personalInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.bio)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.location)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
  });

  it('renders all categories and their skills', () => {
    render(<About info={personalInfo} categories={skillCategories} />);
    for (const cat of skillCategories) {
      expect(screen.getByText(cat.category)).toBeInTheDocument();
      for (const skill of cat.skills) {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
      }
    }
  });

  it('renders development philosophy items', () => {
    render(<About info={personalInfo} categories={skillCategories} />);
    expect(screen.getByText('開發理念')).toBeInTheDocument();
    expect(screen.getByText('以使用者體驗為導向')).toBeInTheDocument();
    expect(screen.getByText('乾淨易維護的模組化架構')).toBeInTheDocument();
    expect(screen.getByText('熱衷將 GenAI 融入日常應用')).toBeInTheDocument();
  });

  it('handles empty skill categories gracefully', () => {
    render(<About info={personalInfo} categories={[]} />);
    expect(screen.getByText(`Hello! 我是 ${personalInfo.name}`)).toBeInTheDocument();
    expect(screen.getByText('核心技術棧 (Tech Stack)')).toBeInTheDocument();
  });
});
