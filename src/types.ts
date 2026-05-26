/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  buttonText?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Review {
  id?: string;
  userId: string;
  userName: string;
  userPhoto?: string | null;
  rating: number;
  comment: string;
  createdAt: any;
}

