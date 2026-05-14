/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { SKILLS, PROJECTS } from '../constants';

const SkillIcon = ({ name }: { name: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent size={32} className="text-accent-purple mb-4" /> : null;
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative bg-mesh overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Building Digital <span className="text-gradient">Experiences</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary max-w-2xl mx-auto"
          >
            I specialize in creating stunning user interfaces and developing high-quality applications that stand out.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl group"
            >
              <SkillIcon name={skill.icon} />
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent-purple transition-colors">
                {skill.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {skill.category}
              </p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-linear-to-r from-accent-purple to-accent-blue"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[2.5rem] glass border-accent-purple/20 relative overflow-hidden text-center group"
        >
          <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              We also craft <span className="text-accent-purple">professional 3D websites</span> in a futuristic way.
            </h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Our 3D immersive experiences are designed to captivate your audience and leave a lasting impression of innovation and professional excellence.
            </p>
            <motion.a 
              href="#projects" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-accent-purple to-accent-blue rounded-full text-white font-bold glow-purple transition-all shadow-xl shadow-accent-purple/20"
            >
              <LucideIcons.Box size={20} />
              View 3D Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary max-w-xl"
            >
              A selection of my recent works where design meets code to solve real-world problems.
            </motion.p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
             <LucideIcons.LayoutGrid size={18} />
             View All Projects
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden glass-card"
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background-deep via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-purple transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <a href={project.githubUrl} className="p-2 text-text-secondary hover:text-white transition-colors">
                    <LucideIcons.Github size={20} />
                  </a>
                  <a href={project.liveUrl} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                    <LucideIcons.ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
