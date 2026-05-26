import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Check, AlertCircle, RefreshCw } from 'lucide-react';

export const TermsConsentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the terms in this session/device
    const accepted = localStorage.getItem('terms_accepted_v1');
    if (!accepted) {
      setIsOpen(true);
      // Disable body scroll when modal is active
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // Check if user has scrolled near the bottom of the container
    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 40;
    if (isBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (agreed) {
      localStorage.setItem('terms_accepted_v1', 'true');
      document.body.style.overflow = 'unset';
      setIsOpen(false);
    }
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  const handleResetDecline = () => {
    setDeclined(false);
    setAgreed(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="terms-modal-wrapper" className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
        {/* Dark semi-transparent overlay */}
        <motion.div
          id="terms-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          id="terms-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-accent-purple/10 flex flex-col max-h-[85vh] z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-gradient-to-r from-accent-purple/10 to-transparent flex items-center gap-3">
            <div className="p-2 bg-accent-purple/20 rounded-xl text-accent-purple">
              <ShieldAlert size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white tracking-tight">
                COMPLIANCE & LIABILITY POLICY
              </h2>
              <p className="text-[11px] text-accent-purple font-mono tracking-wider uppercase">
                Agreement Required Before Proceeding
              </p>
            </div>
          </div>

          {/* Decline Block Screen */}
          <AnimatePresence mode="wait">
            {declined ? (
              <motion.div
                key="declined"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-background-deep/95"
              >
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-3">
                  Access Restricted
                </h3>
                <p className="text-text-secondary text-sm max-w-md leading-relaxed mb-8">
                  You must accept the terms & conditions and liability limitation policy to use this site. 
                  This ensures mutual legal protection for development, consultancy, and cybersecurity engagements.
                </p>
                <button
                  onClick={handleResetDecline}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw size={14} />
                  Review Terms Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="main-modal"
                className="flex-1 flex flex-col min-h-0"
              >
                {/* Scrollable Policy Text area */}
                <div 
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-6 space-y-5 text-sm text-text-secondary leading-relaxed font-sans border-b border-white/5 bg-white/[0.01]"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3A3A3A #0B0B0B'
                  }}
                >
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-xs text-center text-white/95 font-semibold font-sans mb-1">
                      PROFESSIONAL TERMS, CONDITIONS &amp; LIABILITY LIMITATION POLICY
                    </p>
                    <p className="text-[10px] text-center text-text-muted font-mono uppercase tracking-wider">
                      Web Developer &amp; Cybersecurity Professional Services
                    </p>
                    <div className="h-px bg-white/5 my-2.5" />
                    <p className="text-[11px] text-center text-text-muted font-mono leading-none">
                      Effective Date: May 17, 2026
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      1. Introduction &amp; Scope of Agreement
                    </h4>
                    <p className="text-xs text-text-secondary">
                      This document constitutes a legally binding agreement between the professional web developer and cybersecurity consultant (hereinafter referred to as "the Professional," "Service Provider," or "I") and any individual, business, or organization (hereinafter "Client") that engages the Professional's services.
                      By engaging the Professional's services — whether verbally, in writing, or through payment — the Client acknowledges having read, understood, and agreed to all terms stated herein.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      2. Nature of Professional Services
                    </h4>
                    <p className="text-xs text-text-secondary mb-2">
                      The Professional provides the following categories of services:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-text-secondary">
                      <li>Website design, development, and deployment</li>
                      <li>Front-end and back-end web application development</li>
                      <li>Cybersecurity assessments, vulnerability testing, and penetration testing (with explicit written authorization)</li>
                      <li>Security consulting, threat modeling, and risk assessment</li>
                      <li>Code review and security auditing</li>
                      <li>IT security advisory and recommendations</li>
                    </ul>
                    <p className="text-xs text-text-secondary mt-2">
                      All services are rendered in good faith, based on industry-standard best practices, and the Professional's reasonable professional judgment at the time of delivery.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      3. Limitation of Liability
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-white/90 font-medium mb-1">3.1 General Limitation</p>
                        <p className="text-xs text-text-secondary">
                          The Professional shall NOT be held liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from the use, misuse, or inability to use the delivered work, including but not limited to list of revenue, profits, business opportunities, data loss, third-party breaches, or failures of underlying platform vendors.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/90 font-medium mb-1">3.2 Cybersecurity Services — Specific Limitation</p>
                        <p className="text-xs text-text-secondary">
                          All security testing is conducted only on systems for which the Client has provided explicit written authorization. The Professional cannot guarantee that all vulnerabilities will be discovered. A security assessment reflects the state of the system at the time of testing only. Safety of findings and implementation is solely client-side responsibility.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/90 font-medium mb-1">3.3 Cap on Liability</p>
                        <p className="text-xs text-text-secondary">
                          In any case where liability is established, the Professional's total cumulative liability to the Client shall not exceed the total fees paid by the Client for the specific service that gave rise to the claim, within the three (3) months preceding the incident.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      4. Client Responsibilities &amp; Indemnification
                    </h4>
                    <p className="text-xs text-text-secondary">
                      The Client agrees to check and warrant legal ownership and authorization over all domains, codebases, and systems. You will not use tools or deliverables for unauthorized or malicious acts. The Client agrees to indemnify and hold harmless the Professional against any legal liabilities resulting from misuse, compliance violations, or unauthorized modifications.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      5. Authorized Use of Cybersecurity Knowledge
                    </h4>
                    <p className="text-xs text-text-secondary">
                      The Professional possesses advanced knowledge in cybersecurity, ethical hacking, and vulnerability research. This knowledge is used exclusively for authorized assessments, defense research, and proactive system hardening. Unlawful activities under CFAA, GDPR, or related legislations are strictly prohibited. Safe harbor conditions are recognized strictly under written authorizations.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      6. Intellectual Property
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Unless otherwise agreed in writing, client code and deliverables become the Client's property upon complete payment. The Professional retains the right to reference the project in portfolios anonymously. Pre-existing tools and libraries remain the Professional's exclusive property. 
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      7. Confidentiality
                    </h4>
                    <p className="text-xs text-text-secondary">
                      All systems, assessments, source codes, and credentials remain under strict non-disclosure terms. Findings shall be delivered securely and directly only to the verified counterpart.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      8. Disclaimer of Warranties
                    </h4>
                    <p className="text-xs text-text-secondary font-sans">
                      All services are provided on an "AS IS" and "AS AVAILABLE" basis. No warranties are offered regarding fitness for a particular purpose or guaranteed elimination of all potential vulnerabilities.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      9. Governing Law &amp; Dispute Resolution
                    </h4>
                    <p className="text-xs text-text-secondary font-sans">
                      This agreement is governed by the laws of the jurisdiction in which the Professional active. Any disputes shall first be mediated through good-faith negotiation, then binding arbitration if required.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold font-display text-xs uppercase tracking-wider mb-2 text-accent-purple">
                      10. Amendments &amp; Entire Agreement
                    </h4>
                    <p className="text-xs text-text-secondary font-sans">
                      This represents the complete agreement regarding liability and professional conduct. It supersedes all prior verbal or written agreements.
                    </p>
                  </div>

                  {/* Scroll tip bar */}
                  {!hasScrolledToBottom && (
                    <div className="sticky bottom-0 left-0 right-0 py-2 bg-gradient-to-t from-[#0D0D0D] to-transparent text-center animate-bounce">
                      <p className="text-[10px] text-accent-purple font-mono bg-[#0D0D0D]/95 px-3 py-1 inline-block rounded-full border border-accent-purple/20">
                        ↓ Scroll to bottom to unlock agreement
                      </p>
                    </div>
                  )}
                </div>

                {/* Agreement Panel & Action Controls */}
                <div className="p-6 bg-[#090909]/80 border-t border-white/5 space-y-4">
                  <label className="flex gap-3 text-xs select-none cursor-pointer text-text-secondary hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={agreed}
                      disabled={!hasScrolledToBottom}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-white/10 bg-white/5 text-accent-purple focus:ring-accent-purple/50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className={!hasScrolledToBottom ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}>
                      I have read and agree to the Terms &amp; Conditions and Privacy Policy policy outlined above.
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleDecline}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 hover:text-red-400 border border-white/5 text-xs text-text-secondary font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={handleAccept}
                      disabled={!agreed}
                      className="w-full py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:bg-accent-purple/30 disabled:text-text-muted disabled:shadow-none text-xs text-white font-bold rounded-xl shadow-lg shadow-accent-purple/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check size={14} />
                      I Agree
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
