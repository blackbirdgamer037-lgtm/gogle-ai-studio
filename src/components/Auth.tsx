import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signOut } from 'firebase/auth';
import { auth, signInWithGoogle } from '../lib/firebase';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthButton = () => {
  const { user, triggerAuthError } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
    try {
      localStorage.removeItem('simulated_guest_user');
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs text-text-secondary font-medium">Hello,</span>
          <span className="text-sm text-white font-bold max-w-[150px] truncate">{user.displayName || 'Developer'}</span>
        </div>
        <div className="relative group">
           <img 
            src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-accent-purple cursor-pointer"
          />
          <div className="absolute top-full right-0 mt-2 w-48 glass rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
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
