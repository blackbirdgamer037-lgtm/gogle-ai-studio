import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signOut } from 'firebase/auth';
import { auth, signInWithGoogle } from '../lib/firebase';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthButton = () => {
  const { user, triggerAuthError, loginAsGuest } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customName, setCustomName] = useState('blackbirdgamer037@gmail.com');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setShowDropdown(false);
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

  const handleGuestLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setShowDropdown(false);
    try {
      await loginAsGuest();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCustomLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setShowDropdown(false);
    try {
      const finalName = customName.trim() || 'Developer';
      await loginAsGuest(finalName);
    } catch (error) {
      console.error(error);
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
    <div className="relative" ref={dropdownRef}>
      <motion.button
        disabled={isLoggingIn}
        whileHover={isLoggingIn ? undefined : { scale: 1.02 }}
        whileTap={isLoggingIn ? undefined : { scale: 0.98 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 px-6 py-2.5 bg-accent-purple hover:bg-accent-purple/90 text-white text-sm font-bold rounded-full transition-all glow-purple ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoggingIn ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <LogIn size={18} />
            Sign In
          </>
        )}
      </motion.button>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute right-0 mt-3 w-64 glass rounded-2xl p-3 border border-white/10 shadow-2xl bg-background-deep/95 backdrop-blur-md z-[55] space-y-2.5"
        >
          <div className="px-2 py-1 border-b border-white/5">
            <p className="text-[11px] font-bold text-accent-purple uppercase tracking-wider font-mono">Sign-In Method</p>
            <p className="text-[10px] text-text-muted mt-0.5">Select a method that works for your environment</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full text-left flex items-center gap-3 px-3 py-2 text-xs text-white hover:bg-white/5 rounded-xl transition-all font-semibold"
          >
            <div className="p-1.5 px-2.5 bg-white/5 rounded-lg text-white">G</div>
            <div>
              <p className="font-display font-medium text-white">Google Account</p>
              <p className="text-[9px] text-text-secondary">Requires popup support</p>
            </div>
          </button>

          <button
            onClick={handleGuestLogin}
            className="w-full text-left flex items-center gap-3 px-3 py-2 text-xs text-white hover:bg-white/5 rounded-xl transition-all font-semibold"
          >
            <div className="p-1.5 bg-accent-purple/20 text-accent-purple rounded-lg">
              <UserIcon size={14} />
            </div>
            <div>
              <p className="font-display font-medium text-accent-purple">Instant Guest Access</p>
              <p className="text-[9px] text-text-secondary">Generates random name</p>
            </div>
          </button>

          <div className="px-2 py-1.5 border-t border-white/5 pt-2">
            <p className="text-[10px] font-bold text-accent-blue uppercase font-mono tracking-wider mb-2">Direct Developer Sign-In</p>
            <div className="flex gap-2">
              <input 
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Name or email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-accent-purple/50 font-sans"
              />
              <button 
                onClick={handleCustomLogin}
                className="px-3 py-1.5 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold rounded-lg text-xs transition-all shrink-0 cursor-pointer"
              >
                Go
              </button>
            </div>
            <p className="text-[9px] text-text-muted mt-1.5 font-normal">Type custom email/name &amp; bypass pops securely!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
