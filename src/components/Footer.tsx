/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, ExternalLink, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden border-white/5">
          {/* Animated decorative lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_8s_infinite_linear]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8"
              >
                Bringing your<br />
                <span className="text-gradient">ideas to life.</span>
              </motion.h2>
              <p className="text-text-secondary text-lg mb-12 leading-relaxed">
                Have a project in mind or just want to chat? 
                Let's turn your vision into reality. 
                I'm always open to new opportunities and interesting collaborations.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Me', value: 'hello@apex.dev' },
                  { icon: Github, label: 'Follow', value: 'github.com/apex' },
                  { icon: Linkedin, label: 'Connect', value: 'linkedin.com/in/apex' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-medium uppercase tracking-widest">{item.label}</p>
                      <p className="text-text-primary group-hover:text-accent-purple transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all placeholder:text-text-muted text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all placeholder:text-text-muted text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all placeholder:text-text-muted text-white resize-none"
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-xl shadow-lg shadow-accent-purple/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-display font-bold text-gradient mb-2 text-center md:text-left">
              Shashank.dev
            </div>
            <p className="text-text-muted text-sm text-center md:text-left font-medium">
               Crafted with passion by Shashank Nayal • © 2026
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-text-muted hover:text-accent-purple transition-colors"><Github size={20} /></a>
            <a href="#" className="text-text-muted hover:text-accent-purple transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-text-muted hover:text-accent-purple transition-colors"><Twitter size={20} /></a>
          </div>

          <div className="text-text-muted text-xs font-mono uppercase tracking-widest hidden md:block">
            Designed for the future
          </div>
        </div>
      </div>
    </footer>
  );
};
