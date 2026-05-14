/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Globe, GithubIcon } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.8)']
  );

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold text-gradient"
          >
            Shashank.dev
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-text-secondary hover:text-accent-purple px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-background-deep border-b border-white/10"
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-text-secondary hover:text-accent-purple px-3 py-4 text-base font-medium border-b border-white/5"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values based on scroll progress within the Hero section
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6], [100, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.8, 1, 1]);

  return (
    <section id="home" ref={containerRef} className="relative h-[200vh]">
      {/* Sticky container that stays fixed while scrolling through the 200vh depth */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 blur-[120px] rounded-full animate-pulse duration-5000 shadow-2xl" />
        
        <motion.div 
          style={{ opacity, y, scale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 relative">
              <div className="w-32 h-32 rounded-full p-1 bg-linear-to-r from-accent-purple to-accent-blue">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shashank" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full bg-background-deep"
                />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border-2 border-dashed border-accent-purple/30 rounded-full"
              />
            </div>

            <p className="text-accent-purple font-medium tracking-widest uppercase text-sm mb-4">
              Welcome to my universe
            </p>

            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-6">
              Hey, I'm <span className="text-gradient">Shashank Nayal</span><br />
              <span className="text-text-primary">Website Developer</span>
            </h1>

            <p className="max-w-2xl text-text-secondary text-lg mb-10 leading-relaxed">
              A fullstack developer passionate about crafting seamless user experiences. 
              I thrive at the intersection of creativity and functionality, 
              building high-end digital products for the future.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-accent-purple hover:bg-accent-purple/90 text-white font-semibold rounded-full glow-purple transition-all transform hover:scale-105"
              >
                Contact Me
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 glass border-white/10 hover:border-white/20 text-white font-semibold rounded-full transition-all transform hover:scale-105"
              >
                View Projects
              </a>
            </div>

            <div className="mt-16 flex items-center gap-8">
              {[
                { icon: GithubIcon, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Globe, href: "#" },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className="text-text-secondary hover:text-accent-purple transition-colors transform hover:scale-110"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs uppercase tracking-widest">Scroll down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-linear-to-b from-accent-purple to-transparent" 
          />
        </motion.div>
      </div>
    </section>
  );
};
