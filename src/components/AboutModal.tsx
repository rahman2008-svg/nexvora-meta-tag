import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  Info, 
  MessageCircle, 
  Phone, 
  ExternalLink, 
  Check, 
  Copy, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Smartphone,
  Heart
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                About Developer & Company
              </h2>
              <p className="text-xs text-neutral-400">
                NexVora Meta Tag • Version 1.0.0
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          {/* Developer Section */}
          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shrink-0 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-neutral-900 rounded-[14px] flex items-center justify-center">
                  <User className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Prince AR Abdur Rahman
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Developer
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-cyan-300 font-medium">
                  Independent App Developer
                </p>
                <p className="text-xs leading-relaxed text-neutral-300 pt-1">
                  Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
                </p>
              </div>
            </div>

            {/* Direct Contact & Social Links */}
            <div className="mt-4 pt-4 border-t border-neutral-800/80">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                Contact & Social Profiles
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* WhatsApp 1 */}
                <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-600/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400">WhatsApp 1</div>
                      <div className="font-mono text-xs text-neutral-200">01707424006</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard('01707424006', 'wa1')}
                      className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
                      title="Copy number"
                    >
                      {copiedText === 'wa1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href="https://wa.me/8801707424006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[11px] font-semibold rounded border border-emerald-500/30 flex items-center gap-1"
                    >
                      Chat <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp 2 */}
                <div className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-600/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400">WhatsApp 2</div>
                      <div className="font-mono text-xs text-neutral-200">01796951709</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard('01796951709', 'wa2')}
                      className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
                      title="Copy number"
                    >
                      {copiedText === 'wa2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href="https://wa.me/8801796951709"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[11px] font-semibold rounded border border-emerald-500/30 flex items-center gap-1"
                    >
                      Chat <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-blue-600/50 hover:bg-neutral-850 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400">Facebook Profile</div>
                      <div className="text-xs text-neutral-200 font-medium group-hover:text-blue-400 transition-colors">
                        Prince AR Abdur Rahman
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-pink-600/50 hover:bg-neutral-850 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400">Instagram Handle</div>
                      <div className="text-xs text-neutral-200 font-medium group-hover:text-pink-400 transition-colors">
                        @ur___abdur____rahman__2008
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/10">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">NexVora Lab's Ofc</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Official Studio
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  NexVora Lab's Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
                </p>
              </div>
            </div>

            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-white">Mission: </span>
                <span className="text-xs text-neutral-300">
                  Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone.
                </span>
              </div>
            </div>
          </div>

          {/* Technical Info & Credits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-950/70 border border-neutral-800/90 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Technical Information</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Application Name:</span>
                  <span className="font-semibold text-neutral-200">NexVora Meta Tag</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Version:</span>
                  <span className="font-mono font-bold text-cyan-400">1.0.0</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Architecture:</span>
                  <span className="text-neutral-200">React 19 + TypeScript + Vite</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-950/70 border border-neutral-800/90 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Credits & Copyright</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Developed by:</span>
                  <span className="font-semibold text-white">Prince AR Abdur Rahman</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Published by:</span>
                  <span className="font-semibold text-white">NexVora Lab's Ofc</span>
                </div>
                <div className="pt-1 text-[11px] text-neutral-400">
                  © 2026 NexVora Lab's Ofc. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>Built with passion by</span>
            <span className="text-cyan-400 font-semibold">Prince AR Abdur Rahman</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
