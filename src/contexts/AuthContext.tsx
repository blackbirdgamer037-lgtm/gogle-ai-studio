import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth, signInAsGuest } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  triggerAuthError: (error: any) => void;
  clearAuthError: () => void;
  loginAsGuest: (displayName?: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  authError: null,
  triggerAuthError: () => {},
  clearAuthError: () => {},
  loginAsGuest: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (isMounted && result) {
          setUser(result.user);
        }
      } catch (error: any) {
        // Initial iframe redirect permission check is expected to fail on load.
        // We log as warning/info on console and do NOT show the intrusive UI block.
        console.warn('Initial redirect check threw an expected restriction error:', error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const triggerAuthError = (error: any) => {
    const errMsg = error?.message || String(error);
    console.error('Captured auth error:', errMsg);
    
    if (errMsg.includes('cancelled-popup-request') || errMsg.includes('popup-closed-by-user')) {
      setAuthError('cancelled-popup-request');
    } else {
      setAuthError(errMsg);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const loginAsGuest = async (displayName: string = 'Guest ' + Math.floor(Math.random() * 900 + 100)) => {
    try {
      const guestUser = await signInAsGuest(displayName);
      setUser(guestUser);
      setAuthError(null);
      return guestUser;
    } catch (error) {
      console.error('Failed to sign in as guest:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, triggerAuthError, clearAuthError, loginAsGuest }}>
      {!loading && children}

      {/* Floating Auth Notification Overlay */}
      <AnimatePresence>
        {authError && (
          <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-[90vw]">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="glass p-5 rounded-2xl border border-accent-purple/30 shadow-2xl shadow-accent-purple/10 bg-background-deep/95 backdrop-blur-md relative overflow-hidden"
            >
              {/* Highlight background strip */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-purple" />
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple shrink-0">
                  <AlertCircle size={20} />
                </div>
                
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="text-sm font-bold text-white leading-tight">Sign-In Blocked or Closed</h4>
                    <button 
                      onClick={clearAuthError}
                      className="text-text-muted hover:text-white transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Your web browser or the live preview iframe blocked the Google Sign-In popup from opening.
                  </p>

                  <div className="flex flex-col gap-1.5 bg-white/5 p-3 rounded-xl border border-white/5 mb-4 text-[11px] text-text-secondary leading-relaxed">
                    <span className="font-mono text-[9px] font-bold text-accent-purple uppercase tracking-wider block">Recommended Option:</span>
                    <button
                      onClick={async () => {
                        await loginAsGuest();
                      }}
                      className="w-full mt-1 px-3 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-lg shadow-lg shadow-accent-purple/20 transition-all text-xs"
                    >
                      Instant Guest Sign-In
                    </button>
                    <span className="text-[10px] text-text-muted mt-1 leading-normal">
                      Instantly type and post reviews & messages without using Google Accounts!
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a 
                      href={window.location.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold rounded-lg transition-all"
                    >
                      Use New Tab
                      <ExternalLink size={12} />
                    </a>
                    <button
                      onClick={clearAuthError}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[11px] font-semibold rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
