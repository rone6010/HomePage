export interface PersonalInfo {
  name: string;
  chineseName?: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl?: string;
  location: string;
  email: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    blog?: string;
  };
}

export interface SkillItem {
  name: string;
  level?: string;
  iconName?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export type ProjectCategory = 'All' | 'Web App' | 'AI / Data' | 'Mobile' | 'Open Source' | 'Tools';

export interface Project {
  id: string;
  title: string;
  category: 'Web App' | 'AI / Data' | 'Mobile' | 'Open Source' | 'Tools';
  description: string;
  fullDescription: string;
  highlights: string[];
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: 'Completed' | 'In Progress' | 'Maintenance';
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  skills: string[];
}
