import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Building2, 
  User, 
  ShieldCheck, 
  Layers, 
  Share2,
  Phone
} from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenCode: () => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenCode, onOpenAudit }) => {
  return (
    <footer className="mt-20 border-t border-neutral-800 bg-neutral-950 text-neutral-400">
      {/* Top Banner / Mission */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-neutral-800/80">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">NexVora Meta Tag</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time meta tags generator and social card debugger inspired by metatags.io. Test, preview, and export high-conversion SEO tags for Google, Facebook, Twitter, Discord, and messaging apps.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-neutral-300">Published by: </span>
              <span className="text-[11px] text-cyan-400 font-semibold">NexVora Lab's Ofc</span>
            </div>
          </div>

          {/* About Company & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>About NexVora Lab's Ofc</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              NexVora Lab's Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
            </p>
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs space-y-1">
              <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Mission:
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone.
              </p>
            </div>
          </div>

          {/* About Developer & Contacts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <User className="w-4 h-4 text-indigo-400" />
              <span>About Developer</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Prince AR Abdur Rahman</div>
              <div className="text-[11px] text-cyan-400">Independent App Developer</div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <a
                href="https://wa.me/8801707424006"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 rounded-lg text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp: 01707424006</span>
              </a>
              <a
                href="https://wa.me/8801796951709"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 rounded-lg text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp: 01796951709</span>
              </a>
              <a
                href="https://www.facebook.com/share/1BNn32qoJo/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-blue-500/40 text-neutral-300 hover:text-blue-400 rounded-lg text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.instagram.com/ur___abdur____rahman__2008"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-pink-500/40 text-neutral-300 hover:text-pink-400 rounded-lg text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div>
              Developed by <span className="text-neutral-300 font-semibold">Prince AR Abdur Rahman</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div>
              Published by <span className="text-neutral-300 font-semibold">NexVora Lab's Ofc</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div>Version: <span className="font-mono text-cyan-400">1.0.0</span></div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={onOpenAbout} className="hover:text-cyan-400 transition-colors">
              Developer Info
            </button>
            <button onClick={onOpenCode} className="hover:text-cyan-400 transition-colors">
              Generate Meta Code
            </button>
            <button onClick={onOpenAudit} className="hover:text-cyan-400 transition-colors">
              SEO Health Score
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-[11px] text-neutral-600">
          © 2026 NexVora Lab's Ofc. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
