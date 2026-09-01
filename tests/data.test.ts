import { describe, it, expect } from 'vitest';
import { personalInfo, skillCategories, projects, experiences } from '../src/data/portfolioData';

describe('Portfolio Data Integrity', () => {
  it('has valid personal information with email and socials', () => {
    expect(personalInfo.name).toBeTruthy();
    expect(personalInfo.email).toContain('@');
    expect(personalInfo.socials.github).toBeDefined();
  });

  it('contains skill categories with skills list', () => {
    expect(skillCategories.length).toBeGreaterThan(0);
    skillCategories.forEach(cat => {
      expect(cat.skills.length).toBeGreaterThan(0);
    });
  });

  it('contains valid projects with tags and categories', () => {
    expect(projects.length).toBeGreaterThan(0);
    projects.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it('contains valid experiences with periods', () => {
    expect(experiences.length).toBeGreaterThan(0);
    experiences.forEach(e => {
      expect(e.period).toBeTruthy();
      expect(e.role).toBeTruthy();
    });
  });
});
