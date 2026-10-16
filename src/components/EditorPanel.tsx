import React, { useRef, useState } from 'react';
import { 
  Type, 
  AlignLeft, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Upload, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Check, 
  Palette, 
  Eye, 
  Globe, 
  HelpCircle,
  Copy
} from 'lucide-react';
import { MetaTagData, PresetItem } from '../types';
import { SAMPLE_IMAGES, PRESETS, INITIAL_META_DATA } from '../data/presets';

interface EditorPanelProps {
  data: MetaTagData;
  onChange: (updater: (prev: MetaTagData) => MetaTagData) => void;
  onReset: () => void;
  onApplyPreset: (preset: PresetItem) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  onReset,
  onApplyPreset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSampleImages, setShowSampleImages] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Character calculations
  const titleCount = data.title.length;
  const descCount = data.description.length;

  const handleFieldChange = (field: keyof MetaTagData, value: string) => {
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const base64 = loadEvt.target?.result as string;
        if (base64) {
          handleFieldChange('imageUrl', base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const THEME_COLORS = ['#0ea5e9', '#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#000000'];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-6 shadow-xl">
      {/* Panel Top Title */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Meta Tags Content
          </h2>
          <p className="text-xs text-neutral-400">
            Edit content to see live previews update instantaneously
          </p>
        </div>
        <button
          onClick={onReset}
          className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
          title="Reset to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* 1. Page Title */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-cyan-400" />
            Page Title
          </label>
          <span className={`font-mono text-[11px] font-bold ${
            titleCount > 60 ? 'text-amber-400' : titleCount >= 30 ? 'text-emerald-400' : 'text-neutral-400'
          }`}>
            {titleCount} / 60 chars
          </span>
        </div>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="e.g. NexVora — Fast & Privacy-Friendly Apps"
          className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
        />
        {/* Visual Progress Bar */}
        <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              titleCount > 60 ? 'bg-amber-400' : titleCount >= 30 ? 'bg-emerald-400' : 'bg-cyan-500'
            }`}
            style={{ width: `${Math.min(100, (titleCount / 60) * 100)}%` }}
          />
        </div>
        <p className="text-[11px] text-neutral-500">
          Recommended: 40–60 characters. Truncated on Google beyond ~60 chars.
        </p>
      </div>

      {/* 2. Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-cyan-400" />
            Meta Description
          </label>
          <span className={`font-mono text-[11px] font-bold ${
            descCount > 160 ? 'text-amber-400' : descCount >= 110 ? 'text-emerald-400' : 'text-neutral-400'
          }`}>
            {descCount} / 160 chars
          </span>
        </div>
        <textarea
          rows={3}
          value={data.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          placeholder="Provide a concise, enticing summary of your page or app..."
          className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-y leading-relaxed"
        />
        {/* Visual Progress Bar */}
        <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              descCount > 160 ? 'bg-amber-400' : descCount >= 110 ? 'bg-emerald-400' : 'bg-cyan-500'
            }`}
            style={{ width: `${Math.min(100, (descCount / 160) * 100)}%` }}
          />
        </div>
        <p className="text-[11px] text-neutral-500">
          Recommended: 120–160 characters for optimal Google and social feed rendering.
        </p>
      </div>

      {/* 3. Canonical URL */}
      <div className="space-y-1.5">
        <label className="font-semibold text-neutral-300 text-xs flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
          Canonical URL
        </label>
        <input
          type="url"
          value={data.url}
          onChange={(e) => handleFieldChange('url', e.target.value)}
          placeholder="https://nexvora.com"
          className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
        />
      </div>

      {/* 4. Open Graph Image */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            Social Share Image (og:image)
          </label>
          <span className="text-[11px] text-cyan-400 font-medium">
            1200 × 630 px (1.91:1)
          </span>
        </div>

        {/* Thumbnail Preview & Upload Options */}
        {data.imageUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-neutral-700/80 bg-neutral-950 group">
            <img 
              src={data.imageUrl} 
              alt="Social share preview" 
              className="w-full h-36 object-cover object-center"
              onError={(e) => {
                // fallback placeholder if image fails to load
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80';
              }}
            />
            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-600 shadow"
              >
                <Upload className="w-3.5 h-3.5" /> Change
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange('imageUrl', '')}
                className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold shadow"
              >
                Remove
              </button>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] text-neutral-300 font-mono">
              Live Preview Loaded
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-neutral-700 hover:border-cyan-500/60 rounded-xl bg-neutral-950/50 flex flex-col items-center justify-center cursor-pointer transition-colors text-neutral-400 hover:text-neutral-200"
          >
            <Upload className="w-6 h-6 text-neutral-500 mb-1" />
            <span className="text-xs font-semibold">Click to upload image or drag & drop</span>
            <span className="text-[10px] text-neutral-500">PNG, JPG, WebP supported</span>
          </div>
        )}

        {/* Input for Image URL */}
        <input
          type="text"
          value={data.imageUrl}
          onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
          placeholder="Or paste direct image URL (https://...)"
          className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3.5 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 font-mono"
        />

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageFileUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Sample Images Quick Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowSampleImages(!showSampleImages)}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showSampleImages ? 'Hide sample images' : 'Choose from sample thumbnails'}</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            <span>Upload local file</span>
          </button>
        </div>

        {/* Sample Images Grid */}
        {showSampleImages && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 bg-neutral-950 rounded-xl border border-neutral-800 animate-in fade-in duration-150">
            {SAMPLE_IMAGES.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  handleFieldChange('imageUrl', img.url);
                  setShowSampleImages(false);
                }}
                className="group text-left rounded-lg overflow-hidden border border-neutral-800 hover:border-cyan-500 transition-all"
              >
                <img src={img.url} alt={img.name} className="w-full h-14 object-cover" />
                <div className="p-1 bg-neutral-900 text-[10px] text-neutral-300 truncate font-medium group-hover:text-cyan-400">
                  {img.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Settings Accordion */}
      <div className="border-t border-neutral-800 pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-xs font-bold text-neutral-300 hover:text-white py-1"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Advanced SEO & Social Configurations
          </span>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 pt-2 border-t border-neutral-800/60">
            {/* Site Name & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Site Name (og:site_name)
                </label>
                <input
                  type="text"
                  value={data.siteName}
                  onChange={(e) => handleFieldChange('siteName', e.target.value)}
                  placeholder="e.g. NexVora Lab"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Author
                </label>
                <input
                  type="text"
                  value={data.author}
                  onChange={(e) => handleFieldChange('author', e.target.value)}
                  placeholder="Prince AR Abdur Rahman"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Twitter Card Type & OG Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Twitter Card Format
                </label>
                <select
                  value={data.twitterCard}
                  onChange={(e) => handleFieldChange('twitterCard', e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                  <option value="summary">summary (Small Square Thumbnail)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Open Graph Type (og:type)
                </label>
                <select
                  value={data.ogType}
                  onChange={(e) => handleFieldChange('ogType', e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </div>
            </div>

            {/* Robots Directive & Locale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Robots Crawling Directive
                </label>
                <select
                  value={data.robots}
                  onChange={(e) => handleFieldChange('robots', e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="index, follow">index, follow (Allow search indexing)</option>
                  <option value="noindex, follow">noindex, follow (Hide from search)</option>
                  <option value="index, nofollow">index, nofollow (Index page, ignore links)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Strictly block)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400">
                  Locale (og:locale)
                </label>
                <input
                  type="text"
                  value={data.locale}
                  onChange={(e) => handleFieldChange('locale', e.target.value)}
                  placeholder="en_US"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Theme Color Picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-cyan-400" />
                Browser Theme Color (theme-color)
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleFieldChange('themeColor', c)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        data.themeColor === c ? 'scale-110 border-white shadow-sm' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={data.themeColor}
                  onChange={(e) => handleFieldChange('themeColor', e.target.value)}
                  className="w-24 bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Keywords */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400">
                SEO Keywords (comma separated)
              </label>
              <input
                type="text"
                value={data.keywords}
                onChange={(e) => handleFieldChange('keywords', e.target.value)}
                placeholder="android apps, meta tags, seo generator..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Template Switcher */}
      <div className="border-t border-neutral-800 pt-4">
        <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center justify-between">
          <span>Quick Presets</span>
          <span className="text-[10px] text-neutral-500">1-click fill</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset)}
              className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-[11px] font-medium transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
