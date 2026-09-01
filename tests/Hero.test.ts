import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../src/components/Hero';
import { personalInfo } from '../src/data/portfolioData';

describe('Hero Component', () => {
  it('renders hero title and personal info', () => {
    render(<Hero info={personalInfo} />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
    if (personalInfo.chineseName) {
      expect(screen.getByText(`(${personalInfo.chineseName})`)).toBeInTheDocument();
    }
    expect(screen.getByText(personalInfo.title)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.tagline)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /探索 Side Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /聯絡我/i })).toBeInTheDocument();
  });

  it('renders social links correctly with accessible labels and attributes', () => {
    render(<Hero info={personalInfo} />);
    
    if (personalInfo.socials.github) {
      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', personalInfo.socials.github);
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noreferrer');
    }

    if (personalInfo.socials.linkedin) {
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', personalInfo.socials.linkedin);
      expect(linkedinLink).toHaveAttribute('target', '_blank');
    }

    if (personalInfo.socials.twitter) {
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', personalInfo.socials.twitter);
      expect(twitterLink).toHaveAttribute('target', '_blank');
    }
  });

  it('renders correctly without optional chineseName and social links', () => {
    const minimalInfo = {
      name: 'Jane Doe',
      title: 'Software Developer',
      tagline: 'Building great software',
      bio: 'Bio text',
      location: 'Remote',
      email: 'jane@example.com',
      socials: {}
    };

    render(<Hero info={minimalInfo} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
  });
});
