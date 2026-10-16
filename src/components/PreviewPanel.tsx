import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  ExternalLink, 
  ThumbsUp, 
  MessageSquare, 
  Share, 
  Bookmark, 
  Heart, 
  Repeat2, 
  Send, 
  MoreHorizontal,
  CheckCheck,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { MetaTagData, PlatformId } from '../types';

interface PreviewPanelProps {
  data: MetaTagData;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data }) => {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('all');
  const [googleDevice, setGoogleDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [googleTheme, setGoogleTheme] = useState<'dark' | 'light'>('dark');

  // Extract clean domain and hostname
  const getDomain = (url: string) => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsed.hostname;
    } catch {
      return 'nexvora.com';
    }
  };

  const domain = getDomain(data.url);
  const displayUrl = data.url.replace(/^https?:\/\//, '');

  const platformsList: { id: PlatformId; label: string; icon: string }[] = [
    { id: 'all', label: 'All Channels', icon: '✨' },
    { id: 'google', label: 'Google Search', icon: '🔍' },
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'twitter', label: 'Twitter / X', icon: '𝕏' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { id: 'discord', label: 'Discord', icon: '💬' },
    { id: 'slack', label: 'Slack', icon: '⚡' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Platform Selector Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-2.5 flex items-center justify-between flex-wrap gap-2 shadow-lg">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {platformsList.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activePlatform === p.id
                  ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-controls when Google is selected */}
        {(activePlatform === 'google' || activePlatform === 'all') && (
          <div className="flex items-center gap-1.5 ml-auto text-xs">
            <span className="text-[11px] text-neutral-500 hidden md:inline">Google Preview:</span>
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
              <button
                onClick={() => setGoogleDevice('desktop')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  googleDevice === 'desktop' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                }`}
                title="Desktop Google SERP"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGoogleDevice('mobile')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  googleDevice === 'mobile' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                }`}
                title="Mobile Google SERP"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
              <button
                onClick={() => setGoogleTheme('dark')}
                className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                  googleTheme === 'dark' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setGoogleTheme('light')}
                className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                  googleTheme === 'light' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                }`}
              >
                Light
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid or Tab Content */}
      <div className="space-y-8">
        {/* ================= GOOGLE PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'google') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🔍</span>
                <h3 className="text-sm font-bold text-white">Google Search Result</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {googleDevice} • {googleTheme}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                Title ~60 chars • Description ~158 chars
              </span>
            </div>

            {/* Google SERP Card */}
            <div className={`p-4 sm:p-5 rounded-xl border transition-colors ${
              googleTheme === 'dark' 
                ? 'bg-[#202124] border-[#3c4043] text-[#bdc1c6]' 
                : 'bg-white border-neutral-200 text-[#4d5156]'
            }`}>
              {googleDevice === 'desktop' ? (
                // Google Desktop View
                <div className="max-w-2xl space-y-1.5 font-sans">
                  {/* URL breadcrumb */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden">
                      {data.favicon ? (
                        <img src={data.favicon} alt="Favicon" className="w-4 h-4 object-contain" />
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs font-semibold leading-none ${googleTheme === 'dark' ? 'text-white' : 'text-[#202124]'}`}>
                        {data.siteName || domain}
                      </span>
                      <span className={`text-[11px] font-mono truncate leading-tight ${googleTheme === 'dark' ? 'text-[#9aa0a6]' : 'text-[#5f6368]'}`}>
                        https://{displayUrl}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className={`text-lg sm:text-xl font-normal leading-snug cursor-pointer hover:underline ${
                    googleTheme === 'dark' ? 'text-[#8ab4f8]' : 'text-[#1a0dab]'
                  }`}>
                    {data.title || 'Untitled Web Page'}
                  </h4>

                  {/* Snippet & Thumbnail */}
                  <div className="flex items-start gap-4">
                    <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${
                      googleTheme === 'dark' ? 'text-[#bdc1c6]' : 'text-[#4d5156]'
                    }`}>
                      {data.description || 'No meta description provided. Google will extract arbitrary text from your document content.'}
                    </p>
                    {data.imageUrl && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-700/50 hidden sm:block">
                        <img src={data.imageUrl} alt="Snippet thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Google Mobile View
                <div className="max-w-md space-y-2 font-sans">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden">
                      {data.favicon ? (
                        <img src={data.favicon} alt="Favicon" className="w-4 h-4 object-contain" />
                      ) : (
                        <Globe className="w-4 h-4 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${googleTheme === 'dark' ? 'text-white' : 'text-[#202124]'}`}>
                        {data.siteName || domain}
                      </div>
                      <div className={`text-[11px] truncate ${googleTheme === 'dark' ? 'text-[#9aa0a6]' : 'text-[#5f6368]'}`}>
                        {domain}
                      </div>
                    </div>
                  </div>
                  <h4 className={`text-base font-normal leading-snug ${
                    googleTheme === 'dark' ? 'text-[#8ab4f8]' : 'text-[#1a0dab]'
                  }`}>
                    {data.title || 'Untitled Web Page'}
                  </h4>
                  <div className="flex items-start gap-3">
                    <p className={`text-xs leading-relaxed flex-1 ${
                      googleTheme === 'dark' ? 'text-[#bdc1c6]' : 'text-[#4d5156]'
                    }`}>
                      {data.description || 'No description provided.'}
                    </p>
                    {data.imageUrl && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-700/40">
                        <img src={data.imageUrl} alt="Mobile thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= FACEBOOK OPEN GRAPH PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'facebook') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📘</span>
                <h3 className="text-sm font-bold text-white">Facebook Share Card</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-600/10 text-blue-400 border border-blue-600/20">
                  Open Graph
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                Recommended: 1200 × 630 px (1.91:1)
              </span>
            </div>

            {/* Facebook Post Box */}
            <div className="max-w-xl mx-auto bg-[#242526] text-[#e4e6eb] rounded-xl border border-[#393a3b] overflow-hidden shadow-2xl font-sans">
              {/* Header */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {data.author ? data.author.charAt(0) : 'P'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#e4e6eb] hover:underline cursor-pointer">
                      {data.author || 'Prince AR Abdur Rahman'}
                    </div>
                    <div className="text-xs text-[#b0b3b8] flex items-center gap-1">
                      <span>Just now</span> • <Globe className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-[#b0b3b8] cursor-pointer" />
              </div>

              {/* Post Description */}
              <div className="px-3.5 pb-3 text-xs sm:text-sm text-[#e4e6eb]">
                Excited to introduce our latest project release! Check out the live preview and meta tags below:
              </div>

              {/* Shared Link Card */}
              <div className="border-t border-b border-[#393a3b] cursor-pointer group">
                {/* Image */}
                {data.imageUrl ? (
                  <div className="w-full aspect-[1.91/1] overflow-hidden bg-neutral-900 relative">
                    <img 
                      src={data.imageUrl} 
                      alt="Facebook share" 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[1.91/1] bg-neutral-800 flex items-center justify-center text-neutral-400 text-xs">
                    No image provided (1200 × 630 recommended)
                  </div>
                )}

                {/* Card Text Container */}
                <div className="p-3 bg-[#3a3b3c]/60 group-hover:bg-[#3a3b3c] transition-colors space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-[#b0b3b8] font-semibold truncate font-mono">
                    {domain}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#e4e6eb] line-clamp-1 leading-snug">
                    {data.title || 'Untitled Post'}
                  </div>
                  <div className="text-xs text-[#b0b3b8] line-clamp-2 leading-relaxed">
                    {data.description || 'No description available.'}
                  </div>
                </div>
              </div>

              {/* Footer Reactions */}
              <div className="px-4 py-2 border-t border-[#393a3b] flex items-center justify-around text-xs text-[#b0b3b8] font-semibold">
                <button className="flex items-center gap-1.5 hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md transition-colors">
                  <ThumbsUp className="w-4 h-4" /> Like
                </button>
                <button className="flex items-center gap-1.5 hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md transition-colors">
                  <MessageSquare className="w-4 h-4" /> Comment
                </button>
                <button className="flex items-center gap-1.5 hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md transition-colors">
                  <Share className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= TWITTER / X CARD PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'twitter') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-black">𝕏</span>
                <h3 className="text-sm font-bold text-white">Twitter / X Card</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {data.twitterCard}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                {data.twitterCard === 'summary_large_image' ? 'Hero Card • 16:9 / 1.91:1' : 'Square Summary • 1:1'}
              </span>
            </div>

            {/* X Card */}
            <div className="max-w-xl mx-auto bg-black text-white rounded-2xl border border-neutral-800 p-4 font-sans space-y-3 shadow-2xl">
              {/* Tweet Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    {data.author ? data.author.charAt(0) : 'P'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold text-white">
                      <span>{data.author || 'Prince AR Abdur Rahman'}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                    </div>
                    <div className="text-xs text-neutral-500">
                      @nexvora_studio • 1h
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-500" />
              </div>

              {/* Tweet Body */}
              <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed">
                Check out the latest release from NexVora Lab's Ofc! Built for speed, privacy, and exceptional mobile experiences. 🚀
              </p>

              {/* Card Container */}
              {data.twitterCard === 'summary_large_image' ? (
                // Large Image Card
                <div className="rounded-2xl border border-neutral-800 overflow-hidden group cursor-pointer hover:border-neutral-700 transition-colors">
                  {data.imageUrl ? (
                    <div className="w-full aspect-[1.91/1] overflow-hidden bg-neutral-900 relative">
                      <img 
                        src={data.imageUrl} 
                        alt="Twitter Large Card" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300" 
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur text-[11px] font-mono text-neutral-300">
                        {domain}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[1.91/1] bg-neutral-900 flex items-center justify-center text-neutral-500 text-xs">
                      No image provided
                    </div>
                  )}

                  <div className="p-3 bg-neutral-950 space-y-1">
                    <div className="text-xs text-neutral-500 font-mono truncate">
                      {domain}
                    </div>
                    <div className="text-sm font-bold text-white line-clamp-1 leading-snug">
                      {data.title || 'Untitled Post'}
                    </div>
                    <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {data.description || 'No description provided.'}
                    </div>
                  </div>
                </div>
              ) : (
                // Compact Summary Card (Square Image on Left)
                <div className="rounded-2xl border border-neutral-800 overflow-hidden flex items-center group cursor-pointer hover:border-neutral-700 transition-colors bg-neutral-950">
                  <div className="w-28 sm:w-36 h-28 sm:h-36 shrink-0 bg-neutral-900 overflow-hidden">
                    {data.imageUrl ? (
                      <img src={data.imageUrl} alt="Twitter Summary" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-[10px]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 min-w-0 space-y-1">
                    <div className="text-[11px] text-neutral-500 font-mono truncate">
                      {domain}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {data.title || 'Untitled Page'}
                    </div>
                    <div className="text-[11px] text-neutral-400 line-clamp-2">
                      {data.description || 'No description provided.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Tweet Action Icons */}
              <div className="flex items-center justify-between text-neutral-500 pt-2 text-xs px-2">
                <span className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer">
                  <MessageSquare className="w-4 h-4" /> 18
                </span>
                <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer">
                  <Repeat2 className="w-4 h-4" /> 42
                </span>
                <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                  <Heart className="w-4 h-4" /> 156
                </span>
                <span className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer">
                  <Bookmark className="w-4 h-4" /> 29
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ================= LINKEDIN PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'linkedin') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">💼</span>
                <h3 className="text-sm font-bold text-white">LinkedIn Post Preview</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-600/10 text-sky-400 border border-sky-600/20">
                  Feed Card
                </span>
              </div>
            </div>

            <div className="max-w-xl mx-auto bg-[#1b1f23] text-neutral-200 rounded-xl border border-neutral-800 overflow-hidden font-sans shadow-2xl">
              {/* Header */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center font-bold text-white text-sm">
                    {data.author ? data.author.charAt(0) : 'P'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{data.author || 'Prince AR Abdur Rahman'}</span>
                      <span className="text-[10px] text-neutral-400">• 1st</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Independent App Developer • NexVora Lab's Ofc
                    </div>
                    <div className="text-[10px] text-neutral-500">2h • Edited • 🌐</div>
                  </div>
                </div>
              </div>

              {/* Post Text */}
              <div className="px-3.5 pb-3 text-xs text-neutral-200 leading-relaxed">
                Thrilled to announce the latest innovations and responsive meta tags framework for modern web & mobile applications.
              </div>

              {/* Card */}
              <div className="border-t border-b border-neutral-800 cursor-pointer">
                {data.imageUrl && (
                  <div className="w-full aspect-[1.91/1] overflow-hidden bg-neutral-950">
                    <img src={data.imageUrl} alt="LinkedIn preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-3 bg-[#282d33] flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {data.title || 'Untitled Post'}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono truncate">
                      {domain}
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-full border border-neutral-700 shrink-0">
                    Visit
                  </button>
                </div>
              </div>

              {/* Reactions Bar */}
              <div className="px-4 py-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="hover:text-white cursor-pointer">👍 Like</span>
                <span className="hover:text-white cursor-pointer">💬 Comment</span>
                <span className="hover:text-white cursor-pointer">🔁 Repost</span>
                <span className="hover:text-white cursor-pointer">✈️ Send</span>
              </div>
            </div>
          </section>
        )}

        {/* ================= DISCORD EMBED PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'discord') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">💬</span>
                <h3 className="text-sm font-bold text-white">Discord Rich Embed</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Rich Embed
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                Left accent line mirrors your Theme Color ({data.themeColor})
              </span>
            </div>

            {/* Discord chat message */}
            <div className="max-w-xl mx-auto bg-[#313338] rounded-xl p-4 font-sans text-neutral-200 space-y-2 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                  N
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">NexVora Bot</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#5865f2] text-white text-[9px] font-bold">BOT</span>
                    <span className="text-[11px] text-neutral-400">Today at 4:20 PM</span>
                  </div>
                  <div className="text-xs text-[#00a8fc] hover:underline cursor-pointer pt-0.5">
                    https://{displayUrl}
                  </div>

                  {/* Embed Box with color strip */}
                  <div 
                    className="mt-2.5 rounded-lg bg-[#2b2d31] p-3.5 border-l-4 space-y-2"
                    style={{ borderLeftColor: data.themeColor || '#0ea5e9' }}
                  >
                    <div className="text-[11px] font-bold text-[#b5bac1]">
                      {data.siteName || domain}
                    </div>

                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-sm font-bold text-[#00a8fc] hover:underline block leading-snug"
                    >
                      {data.title || 'Untitled Embed'}
                    </a>

                    <p className="text-xs text-[#dbdee1] leading-relaxed">
                      {data.description || 'No description provided.'}
                    </p>

                    {data.imageUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden max-w-sm">
                        <img src={data.imageUrl} alt="Discord Embed" className="w-full object-cover max-h-56" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= WHATSAPP CHAT PREVIEW ================= */}
        {(activePlatform === 'all' || activePlatform === 'whatsapp') && (
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📱</span>
                <h3 className="text-sm font-bold text-white">WhatsApp & Messaging Preview</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Chat Bubble
                </span>
              </div>
            </div>

            {/* WhatsApp Chat Container */}
            <div className="max-w-md mx-auto bg-[#0b141a] rounded-xl p-4 font-sans shadow-2xl space-y-2">
              <div className="flex justify-end">
                <div className="max-w-sm bg-[#005c4b] text-neutral-100 rounded-2xl rounded-tr-xs p-2.5 space-y-1.5 shadow-md">
                  {/* Rich Link Card inside bubble */}
                  <div className="bg-[#025141] rounded-xl overflow-hidden border border-[#046a57]">
                    {data.imageUrl && (
                      <div className="w-full h-36 bg-black/40 overflow-hidden">
                        <img src={data.imageUrl} alt="WhatsApp preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-2.5 space-y-0.5">
                      <div className="text-xs font-bold text-white line-clamp-1">
                        {data.title || 'Untitled Link'}
                      </div>
                      <div className="text-[11px] text-neutral-300 line-clamp-2 leading-tight">
                        {data.description || 'No description.'}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono truncate pt-0.5">
                        {domain}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-cyan-200 underline pt-0.5">
                    https://{displayUrl}
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-300">
                    <span>9:41 PM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
