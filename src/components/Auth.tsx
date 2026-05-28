import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { signInWithGoogle } from '../lib/firebase';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthButton = () => {
  const { user, triggerAuthError, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      if (triggerAuthError) {
        triggerAuthError(error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4" ref={menuRef}>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs text-text-secondary font-medium">Hello,</span>
          <span className="text-sm text-white font-bold max-w-[150px] truncate">{user.displayName || 'Developer'}</span>
        </div>
        <div className="relative">
           <img 
            src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
            alt="Profile" 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full border-2 border-accent-purple cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          />
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-3 w-48 glass rounded-xl border border-white/10 shadow-2xl bg-background-deep/95 backdrop-blur-md p-2 z-50 space-y-1"
              >
                <div className="px-3 py-1.5 border-b border-white/5 mb-1 text-left">
                  <p className="text-[11px] font-bold text-accent-purple uppercase tracking-wider font-mono">My Account</p>
                  <p className="text-xs font-semibold text-white truncate max-w-[150px] mt-0.5">{user.displayName || 'Developer'}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all text-left"
                >
                  <LogOut size={16} className="text-red-400 shrink-0" />
                  <span className="font-semibold text-xs text-white">Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <motion.button
      disabled={isLoggingIn}
      whileHover={isLoggingIn ? undefined : { scale: 1.05 }}
      whileTap={isLoggingIn ? undefined : { scale: 0.95 }}
      onClick={handleLogin}
      className={`flex items-center gap-2 px-6 py-2.5 bg-accent-purple hover:bg-accent-purple/90 text-white text-sm font-bold rounded-full transition-all glow-purple ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoggingIn ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <LogIn size={18} />
          Sign In
        </>
      )}
    </motion.button>
  );
};
