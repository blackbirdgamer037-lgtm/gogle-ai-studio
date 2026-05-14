/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nebula Dashboard',
    description: 'A revolutionary SaaS management dashboard with real-time analytics and autonomous AI insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TypeScript', 'Tailwind', 'D3.js'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'Web App'
  },
  {
    id: '2',
    title: 'Cyber Commerce',
    description: 'Futuristic e-commerce platform with 3D product previews and instant crypto settlements.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Solidity', 'Three.js'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'Full Stack'
  },
  {
    id: '3',
    title: 'Aura AI',
    description: 'A generative AI assistant that learns your creative workflow and suggests optimizations in real-time.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'PyTorch', 'React'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'AI Project'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', icon: 'Cpu', category: 'Frontend', level: 95 },
  { name: 'Next.js', icon: 'Zap', category: 'Frontend', level: 90 },
  { name: 'TypeScript', icon: 'Code2', category: 'Frontend', level: 85 },
  { name: 'Node.js', icon: 'Terminal', category: 'Backend', level: 88 },
  { name: 'PostgreSQL', icon: 'Database', category: 'Backend', level: 80 },
  { name: 'Tailwind CSS', icon: 'Palette', category: 'Design', level: 95 },
  { name: 'Figma', icon: 'Figma', category: 'Design', level: 85 },
  { name: 'Three.js', icon: 'Box', category: 'Creative', level: 70 }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'TechFlow Solutions',
    role: 'Senior Frontend Developer',
    period: '2023 - Present',
    description: 'Leading the development of high-performance web applications using React and Next.js. Architected a custom UI library used across 12 product lines.'
  },
  {
    company: 'Nexus Creative Studio',
    role: 'Full Stack Developer',
    period: '2021 - 2023',
    description: 'Developed immersive digital experiences for high-end fashion brands. Integrated AI-driven personalization engines and real-time 3D visualizations.'
  },
  {
    company: 'InnoStartups',
    role: 'Junior Developer',
    period: '2019 - 2021',
    description: 'Focused on building scalable MVP products for early-stage startups. Worked closely with designers to implement pixel-perfect user interfaces.'
  }
];
