import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType, isAdmin, loginAsAdmin } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Review } from '../types';
import { 
  Users, 
  MessageSquare, 
  Trash2, 
  ShieldCheck, 
  Search, 
  Filter,
  Calendar,
  Mail,
  User as UserIcon,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Star
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  budget?: number;
  plan?: string;
  userId: string;
  createdAt: any;
}

export const AdminPortal = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'users' | 'reviews'>('messages');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Login State
  const [email, setEmail] = useState('shashanknayal4@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // If user is already logged in but not admin, redirect
    if (!loading && user && !isAdmin(user)) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const getMergedMessages = (dbMessages: ContactMessage[]): ContactMessage[] => {
    const localStr = localStorage.getItem('local_messages');
    if (!localStr) return dbMessages;
    try {
      const localMsgs = JSON.parse(localStr) as ContactMessage[];
      const filteredLocal = localMsgs.filter(
        (lm) => !dbMessages.some((dm) => dm.message === lm.message && dm.userId === lm.userId)
      );
      const mergedList = [...filteredLocal, ...dbMessages];
      mergedList.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return Number(dateB) - Number(dateA);
      });
      return mergedList;
    } catch (e) {
      return dbMessages;
    }
  };

  const getMergedReviews = (dbReviews: Review[]): Review[] => {
    const localStr = localStorage.getItem('local_reviews');
    if (!localStr) return dbReviews;
    try {
      const localReviews = JSON.parse(localStr) as Review[];
      const filteredLocal = localReviews.filter(
        (lr) => !dbReviews.some((dr) => dr.comment === lr.comment && dr.userId === lr.userId)
      );
      const mergedList = [...filteredLocal, ...dbReviews];
      mergedList.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return Number(dateB) - Number(dateA);
      });
      return mergedList;
    } catch (e) {
      return dbReviews;
    }
  };

  useEffect(() => {
    if (!isAdmin(user)) return;

    // Listen to messages
    const qMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactMessage[];
      setMessages(getMergedMessages(msgs));
    }, (error) => {
      console.warn('AdminPortal: Error fetching messages from Firestore, using robust offline fallback:', error);
      setMessages(getMergedMessages([]));
    });

    // Listen to reviews
    const qReviews = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribeReviews = onSnapshot(qReviews, (snapshot) => {
      const revs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(getMergedReviews(revs));
    }, (error) => {
      console.warn('AdminPortal: Error fetching reviews from Firestore, using robust offline fallback:', error);
      setReviews(getMergedReviews([]));
    });

    return () => {
      unsubscribeMessages();
      unsubscribeReviews();
    };
  }, [user]);

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        // Handle local message deletion from localStorage
        if (id.startsWith('local_')) {
          const localSaved = localStorage.getItem('local_messages');
          if (localSaved) {
            const parsed = JSON.parse(localSaved) as ContactMessage[];
            const filtered = parsed.filter(m => m.id !== id);
            localStorage.setItem('local_messages', JSON.stringify(filtered));
          }
          setMessages(prev => prev.filter(m => m.id !== id));
          return;
        }

        // Try deleting from Firestore
        await deleteDoc(doc(db, 'messages', id));
        // Also ensure any local memory copy of it gets stripped
        setMessages(prev => prev.filter(m => m.id !== id));
      } catch (error) {
        console.warn('Firestore message delete restricted, matching with local optimistic removal:', error);
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        // Handle local review deletion from localStorage
        if (id.startsWith('local_')) {
          const localSaved = localStorage.getItem('local_reviews');
          if (localSaved) {
            const parsed = JSON.parse(localSaved) as Review[];
            const filtered = parsed.filter(r => r.id !== id);
            localStorage.setItem('local_reviews', JSON.stringify(filtered));
          }
          setReviews(prev => prev.filter(r => r.id !== id));
          return;
        }

        // Try deleting from Firestore
        await deleteDoc(doc(db, 'reviews', id));
        // Also ensure any local memory copy of it gets stripped
        setReviews(prev => prev.filter(r => r.id !== id));
      } catch (error) {
        console.warn('Firestore review delete restricted, matching with local optimistic removal:', error);
        setReviews(prev => prev.filter(r => r.id !== id));
      }
    }
  };

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('loading');
    setErrorMessage('');
    try {
      await loginAsAdmin(password);
      setLoginStatus('idle');
    } catch (error: any) {
      setLoginStatus('error');
      setErrorMessage(error.message || 'Authentication failed. Please check your credentials or ensure Email/Password auth is enabled in Firebase Console.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-deep text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary font-mono">Loading Terminal...</p>
        </div>
      </div>
    );
  }

  // If not logged in as Admin, show login form
  if (!isAdmin(user)) {
    return (
      <div className="min-h-screen bg-background-deep flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-8 rounded-3xl border-accent-purple/20"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 flex items-center justify-center text-accent-purple mb-4">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-text-secondary text-sm">Restricted Access only</p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Admin Email</label>
              <input 
                type="email"
                readOnly
                value={email}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-text-muted outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Security Key</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all text-white pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {loginStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <button 
              disabled={loginStatus === 'loading'}
              className="w-full py-4 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-xl shadow-lg shadow-accent-purple/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginStatus === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={18} />
                  Authorize Login
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-text-muted hover:text-white text-sm transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(r => 
    r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 'N/A';

  return (
    <div className="min-h-screen bg-background-deep text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent-purple mb-2">
              <ShieldCheck size={24} />
              <span className="font-mono text-sm tracking-widest uppercase">Admin Terminal</span>
            </div>
            <h1 className="text-4xl font-bold font-sans">Command Center</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 flex-wrap">
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20' : 'text-text-secondary hover:text-white'}`}
            >
              <MessageSquare size={18} />
              Messages
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'reviews' ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20' : 'text-text-secondary hover:text-white'}`}
            >
              <Star size={18} />
              Reviews
            </button>
            <button 
              onDoubleClick={() => alert('Manage users functionality coming soon')}
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20' : 'text-text-secondary hover:text-white'}`}
            >
              <Users size={18} />
              Users
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-text-secondary text-sm mb-1">Total Messages</p>
            <p className="text-3xl font-bold">{messages.length}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-text-secondary text-sm mb-1">Total Reviews</p>
            <p className="text-3xl font-bold text-amber-400">{reviews.length}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-text-secondary text-sm mb-1">Average Star Rating</p>
            <p className="text-3xl font-bold text-emerald-400">{averageRating} ★</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text"
            placeholder={activeTab === 'messages' ? "Search messages, senders, or keywords..." : activeTab === 'reviews' ? "Search reviews, reviewers, or keywords..." : "Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent-purple transition-all"
          />
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'messages' ? (
            <motion.div 
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6"
            >
              {filteredMessages.map((msg) => (
                <motion.div 
                  layout
                  key={msg.id}
                  className="glass-card p-6 rounded-2xl group hover:border-accent-purple/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary">
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{msg.name}</h3>
                          <p className="text-xs text-text-muted font-mono">{msg.email}</p>
                        </div>
                        {msg.plan && (
                          <div className="ml-auto px-4 py-1.5 bg-accent-purple/20 border border-accent-purple/30 rounded-xl flex flex-col items-end">
                            <span className="text-[10px] font-bold text-accent-purple uppercase tracking-widest leading-tight">{msg.plan}</span>
                            <span className="text-[12px] font-mono font-bold text-white">₹{msg.budget?.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {msg.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
                         <span className="flex items-center gap-1">
                           <Calendar size={12} />
                           {msg.createdAt ? (msg.createdAt.toDate ? msg.createdAt.toDate().toLocaleDateString() : new Date(msg.createdAt).toLocaleDateString()) : 'Just now'}
                         </span>
                         <span className="flex items-center gap-1">
                           <Mail size={12} />
                           {msg.email}
                         </span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2">
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                        title="Delete Message"
                      >
                        <Trash2 size={20} />
                      </button>
                      <a 
                        href={`mailto:${msg.email}`}
                        className="p-3 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-xl transition-all"
                        title="Reply via Email"
                      >
                        <ChevronRight size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredMessages.length === 0 && (
                <div className="text-center py-24 glass-card rounded-3xl">
                  <MessageSquare className="mx-auto mb-4 text-text-muted" size={48} />
                  <p className="text-text-secondary">No messages found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          ) : activeTab === 'reviews' ? (
            <motion.div 
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6"
            >
              {filteredReviews.map((rev) => (
                <motion.div 
                  layout
                  key={rev.id}
                  className="glass-card p-6 rounded-2xl group hover:border-accent-purple/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {rev.userPhoto ? (
                          <img
                            src={rev.userPhoto}
                            alt={rev.userName}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                            <UserIcon size={16} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-white flex items-center gap-2">
                            {rev.userName}
                          </h3>
                          <div className="flex text-amber-400 gap-0.5 mt-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                size={12}
                                className={idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {rev.comment}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
                         <span className="flex items-center gap-1">
                           <Calendar size={12} />
                           {rev.createdAt ? (rev.createdAt.toDate ? rev.createdAt.toDate().toLocaleDateString() : new Date(rev.createdAt).toLocaleDateString()) : 'Just now'}
                         </span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2">
                      <button 
                        onClick={() => rev.id && handleDeleteReview(rev.id)}
                        className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                        title="Delete Review"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredReviews.length === 0 && (
                <div className="text-center py-24 glass-card rounded-3xl">
                  <Star className="mx-auto mb-4 text-text-muted" size={48} />
                  <p className="text-text-secondary">No reviews found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
               key="users"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="text-center py-24 glass-card rounded-3xl"
            >
              <Users className="mx-auto mb-4 text-text-muted" size={48} />
              <p className="text-text-secondary">User management system is coming online in the next update.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
