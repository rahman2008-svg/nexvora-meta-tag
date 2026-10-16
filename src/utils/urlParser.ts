import { MetaTagData } from '../types';
import { PRESETS } from '../data/presets';

export async function fetchUrlMetadata(rawUrl: string): Promise<Partial<MetaTagData>> {
  let targetUrl = rawUrl.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  // Check known presets / keywords first
  const lower = targetUrl.toLowerCase();
  if (lower.includes('nexvora')) {
    const nexPreset = PRESETS.find(p => p.id === 'nexvora-app');
    if (nexPreset) return nexPreset.data;
  }
  if (lower.includes('prince') || lower.includes('abdur')) {
    const devPreset = PRESETS.find(p => p.id === 'developer-portfolio');
    if (devPreset) return devPreset.data;
  }
  if (lower.includes('blog') || lower.includes('article')) {
    const blogPreset = PRESETS.find(p => p.id === 'tech-blog');
    if (blogPreset) return blogPreset.data;
  }

  // Try extracting from web via public CORS helper
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const html = data.contents;
      if (html && typeof html === 'string') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const title = 
          doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
          doc.title ||
          '';

        const description = 
          doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
          '';

        let imageUrl = 
          doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
          '';

        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
          try {
            imageUrl = new URL(imageUrl, targetUrl).href;
          } catch {}
        }

        const siteName = 
          doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
          '';

        return {
          title: title.trim(),
          description: description.trim(),
          url: targetUrl,
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
          siteName: siteName || new URL(targetUrl).hostname,
        };
      }
    }
  } catch (err) {
    // CORS or network failure fallback
  }

  // Fallback: generate clean domain-based defaults
  try {
    const host = new URL(targetUrl).hostname.replace(/^www\./, '');
    const cleanName = host.split('.')[0];
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    return {
      title: `${capitalized} — Official Website & Digital Platform`,
      description: `Explore ${capitalized} for cutting-edge solutions, intuitive digital products, and high-performance tools.`,
      url: targetUrl,
      siteName: capitalized,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
    };
  } catch {
    return {
      url: targetUrl,
    };
  }
}
