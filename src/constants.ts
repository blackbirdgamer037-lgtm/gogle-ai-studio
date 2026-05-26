/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Dentist',
    description: 'A premium, modern dental clinic platform designed for dental professionals, featuring patient scheduling, seamless digital health records, and interactive treatment plans.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TypeScript', 'Tailwind', 'UX Design'],
    githubUrl: '#',
    liveUrl: 'https://agent-6a13f5cd8a3bc807eb566--bucolic-yeot-c9ccf9.netlify.app/',
    category: 'Web App',
    buttonText: 'Visit The Website'
  },
  {
    id: '2',
    title: 'Lawyer',
    description: 'A bespoke, sophisticated legal practice platform designed for elite law firms to streamline client consultations, case file management, and digital onboarding.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TypeScript', 'Tailwind', 'Legal Tech'],
    githubUrl: '#',
    liveUrl: 'https://agent-6a13f6b80d4e89e0fb605--bucolic-yeot-c9ccf9.netlify.app/',
    category: 'Web App',
    buttonText: 'Visit the Website'
  },
  {
    id: '3',
    title: 'Cyber Security',
    description: 'An advanced cybersecurity command center designed for continuous threat monitoring, real-time intrusion detection, and proactive network vulnerability assessments across cloud architectures.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TypeScript', 'Tailwind', 'Security'],
    githubUrl: '#',
    liveUrl: 'https://6a13ef1e847e25d9a1621b17--extraordinary-kataifi-f5a43d.netlify.app/',
    category: 'Web App',
    buttonText: 'Visit the Website'
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
