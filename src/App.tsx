/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Hero } from './components/Navigation';
import { Skills, Projects } from './components/Sections';
import { Contact, Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-background-deep selection:bg-accent-purple/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-purple origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>

      <Footer />

      {/* Global Background Bloom */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
    </main>
  );
}
