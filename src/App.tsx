/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { CodeModal } from './components/CodeModal';
import { AboutModal } from './components/AboutModal';
import { SeoAuditDrawer } from './components/SeoAuditDrawer';
import { Footer } from './components/Footer';
import { INITIAL_META_DATA } from './data/presets';
import { MetaTagData, PresetItem } from './types';
import { runSeoAudit } from './utils/seoAuditor';
import { fetchUrlMetadata } from './utils/urlParser';
import { 
  Sparkles, 
  Code2, 
  Check, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Zap,
  User,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [metaData, setMetaData] = useState<MetaTagData>(INITIAL_META_DATA);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSeoAuditOpen, setIsSeoAuditOpen] = useState(false);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run real-time SEO audit
  const auditResult = useMemo(() => runSeoAudit(metaData), [metaData]);

  const handleReset = () => {
    setMetaData(INITIAL_META_DATA);
    showToast('Reset to NexVora default metadata');
  };

  const handleApplyPreset = (preset: PresetItem) => {
    setMetaData(preset.data);
    showToast(`Loaded "${preset.name}" template`);
  };

  const handleFetchUrl = async (url: string) => {
    setIsLoadingUrl(true);
    try {
      const parsed = await fetchUrlMetadata(url);
      setMetaData((prev) => ({
        ...prev,
        ...parsed,
      }));
      showToast(`Inspected metadata for: ${url}`);
    } catch {
      showToast(`Could not fetch ${url}`);
    } finally {
      setIsLoadingUrl(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        onGenerateCode={() => setIsCodeModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
        seoScore={auditResult.score}
        onApplyPreset={handleApplyPreset}
        onFetchUrl={handleFetchUrl}
        isLoadingUrl={isLoadingUrl}
      />

      {/* Hero Sub-header banner (metatags.io style) */}
      <div className="border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 to-neutral-950/40 py-6 px-4 sm:px-6">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                NexVora Meta Tag
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                By Prince AR Abdur Rahman
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Real-time meta tags generator and social card debugger. Edit your title, description, and images on the left to preview pixel-perfect cards for Google, Facebook, Twitter, Discord, and WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Quick About Developer Pill */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Prince AR Abdur Rahman</span>
              <span className="text-[10px] text-cyan-400">• NexVora Lab</span>
            </button>

            {/* Quick Generate Code */}
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Code2 className="w-4 h-4" />
              <span>Get HTML & Framework Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Content */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Interactive Editor Panel */}
          <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 sticky top-20">
            <EditorPanel
              data={metaData}
              onChange={setMetaData}
              onReset={handleReset}
              onApplyPreset={handleApplyPreset}
            />
          </div>

          {/* Right Column: Live Previews */}
          <div className="flex-1 w-full min-w-0">
            <PreviewPanel data={metaData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenCode={() => setIsCodeModalOpen(true)}
        onOpenAudit={() => setIsSeoAuditOpen(true)}
      />

      {/* Modals & Drawers */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        data={metaData}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <SeoAuditDrawer
        isOpen={isSeoAuditOpen}
        onClose={() => setIsSeoAuditOpen(false)}
        checks={auditResult.checks}
        score={auditResult.score}
      />

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-100 text-xs font-semibold rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
