import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { MetaTagData } from '../types';
import { 
  generateHtmlHead, 
  generateNextJsMetadata, 
  generateNuxtHead, 
  generateReactHelmet, 
  generateJsonLd 
} from '../utils/codeGenerators';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MetaTagData;
}

type TabType = 'html' | 'nextjs' | 'nuxt' | 'helmet' | 'jsonld';

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getActiveCode = (): string => {
    switch (activeTab) {
      case 'html':
        return generateHtmlHead(data);
      case 'nextjs':
        return generateNextJsMetadata(data);
      case 'nuxt':
        return generateNuxtHead(data);
      case 'helmet':
        return generateReactHelmet(data);
      case 'jsonld':
        return generateJsonLd(data);
      default:
        return '';
    }
  };

  const codeContent = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = 'meta-tags.html';
    let mimeType = 'text/html';
    let contentToSave = codeContent;

    if (activeTab === 'nextjs') {
      filename = 'metadata.ts';
      mimeType = 'text/typescript';
    } else if (activeTab === 'nuxt') {
      filename = 'seo.vue';
      mimeType = 'text/plain';
    } else if (activeTab === 'helmet') {
      filename = 'MetaTags.tsx';
      mimeType = 'text/typescript';
    } else if (activeTab === 'jsonld') {
      filename = 'schema.json';
      mimeType = 'application/json';
    } else {
      // For HTML, wrap in standard HTML5 skeleton for instant use
      contentToSave = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${codeContent.split('\n').map(line => `  ${line}`).join('\n')}
</head>
<body>
  <h1>${data.title}</h1>
  <p>${data.description}</p>
</body>
</html>`;
    }

    const blob = new Blob([contentToSave], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Generated Meta Tags Code
              </h2>
              <p className="text-xs text-neutral-400">
                Ready to paste into your website's header or framework
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

        {/* Framework Tabs */}
        <div className="px-6 pt-3 bg-neutral-950/70 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'html'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              HTML &lt;head&gt;
            </button>
            <button
              onClick={() => setActiveTab('nextjs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'nextjs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              Next.js 14+
            </button>
            <button
              onClick={() => setActiveTab('nuxt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'nuxt'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              Nuxt 3 (useSeoMeta)
            </button>
            <button
              onClick={() => setActiveTab('helmet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'helmet'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              React Helmet
            </button>
            <button
              onClick={() => setActiveTab('jsonld')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'jsonld'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              JSON-LD Schema
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={handleCopy}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 shadow-cyan-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code View Area */}
        <div className="relative flex-1 overflow-auto bg-neutral-950 p-6 font-mono text-xs">
          <pre className="text-neutral-300 whitespace-pre leading-relaxed select-all">
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Quick Instructions / Footer */}
        <div className="px-6 py-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Includes Open Graph, Twitter Cards, SEO canonical, and robots tags.</span>
          </div>
          <span className="text-[11px] text-neutral-500">NexVora Meta Tag v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
