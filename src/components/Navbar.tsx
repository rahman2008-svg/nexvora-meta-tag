import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Search, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Share2,
  RefreshCw
} from 'lucide-react';
import { PRESETS } from '../data/presets';
import { PresetItem } from '../types';

interface NavbarProps {
  onGenerateCode: () => void;
  onOpenAbout: () => void;
  onOpenSeoAudit: () => void;
  seoScore: number;
  onApplyPreset: (preset: PresetItem) => void;
  onFetchUrl: (url: string) => void;
  isLoadingUrl?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGenerateCode,
  onOpenAbout,
  onOpenSeoAudit,
  seoScore,
  onApplyPreset,
  onFetchUrl,
  isLoadingUrl = false,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onFetchUrl(inputUrl.trim());
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    if (score >= 70) return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/35 transition-all">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  NexVora
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">
                  Meta Tag
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Social Meta Inspector & Generator
              </p>
            </div>
          </button>
        </div>

        {/* URL Inspector Form / Quick Input */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center relative"
        >
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Inspect URL or paste link (e.g. https://nexvora.com)..."
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl pl-10 pr-24 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              disabled={isLoadingUrl}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg border border-neutral-600 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoadingUrl ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                  <span>Checking</span>
                </>
              ) : (
                <span>Inspect</span>
              )}
            </button>
          </div>
        </form>

        {/* Actions / Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Preset templates selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Templates</span>
            </button>

            {showPresetsDropdown && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-700/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowPresetsDropdown(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Load Pre-made Templates
                </div>
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onApplyPreset(preset)}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-800 text-xs flex flex-col gap-0.5 transition-colors"
                  >
                    <span className="font-semibold text-neutral-200">{preset.name}</span>
                    <span className="text-[11px] text-cyan-400">{preset.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SEO Score Button */}
          <button
            onClick={onOpenSeoAudit}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all hover:scale-105 ${getScoreColor(seoScore)}`}
            title="Click to view SEO audit checklist"
          >
            {seoScore >= 80 ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            <span>{seoScore}/100</span>
            <span className="hidden lg:inline text-[11px] font-medium opacity-85">SEO</span>
          </button>

          {/* About Developer Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">About Developer</span>
          </button>

          {/* Primary Action: Generate Meta Tags Code */}
          <button
            onClick={onGenerateCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
          >
            <Code2 className="w-4 h-4" />
            <span>Generate Code</span>
          </button>
        </div>
      </div>

      {/* Mobile URL inspector bar */}
      <div className="md:hidden px-4 pb-2.5 pt-1">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Inspect any website URL..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-20 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoadingUrl}
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-0.5 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700"
          >
            Inspect
          </button>
        </form>
      </div>
    </header>
  );
};
