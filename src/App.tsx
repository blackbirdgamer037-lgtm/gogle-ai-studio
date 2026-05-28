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
import { Reviews } from './components/Reviews';
import { AdminPortal } from './components/AdminPortal';
import { TermsConsentModal } from './components/TermsConsentModal';
import { motion, useScroll, useSpring } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-purple origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="space-y-0">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Reviews />
      </div>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="relative bg-background-deep selection:bg-accent-purple/30 min-h-screen">
          <TermsConsentModal />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>

          <Footer />

          {/* Global Background Bloom */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
        </main>
      </Router>
    </AuthProvider>
  );
}
