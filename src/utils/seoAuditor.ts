import { MetaTagData, SeoCheck } from '../types';

export function runSeoAudit(data: MetaTagData): { checks: SeoCheck[]; score: number } {
  const checks: SeoCheck[] = [];
  let points = 0;
  const maxPoints = 100;

  // 1. Title Length
  const titleLen = data.title.trim().length;
  if (titleLen >= 30 && titleLen <= 60) {
    checks.push({
      id: 'title-length',
      title: 'Title Tag Length',
      status: 'good',
      message: `Optimal length (${titleLen} characters). Search engines display 50-60 characters before truncating.`,
      recommendation: 'Keep between 40 and 60 characters for maximum search visibility.',
    });
    points += 20;
  } else if (titleLen > 60) {
    checks.push({
      id: 'title-length',
      title: 'Title Tag Length',
      status: 'warning',
      message: `Too long (${titleLen} characters). Search engines will truncate with an ellipsis (...).`,
      recommendation: 'Shorten to 60 characters or less to prevent truncation on mobile and desktop SERPs.',
    });
    points += 10;
  } else if (titleLen > 0) {
    checks.push({
      id: 'title-length',
      title: 'Title Tag Length',
      status: 'warning',
      message: `Too short (${titleLen} characters). You may be missing valuable keywords.`,
      recommendation: 'Expand title to at least 30-40 characters with primary keywords.',
    });
    points += 8;
  } else {
    checks.push({
      id: 'title-length',
      title: 'Title Tag Length',
      status: 'error',
      message: 'Title tag is empty.',
      recommendation: 'A title tag is mandatory for search ranking and social sharing previews.',
    });
  }

  // 2. Description Length
  const descLen = data.description.trim().length;
  if (descLen >= 110 && descLen <= 160) {
    checks.push({
      id: 'desc-length',
      title: 'Meta Description Length',
      status: 'good',
      message: `Optimal length (${descLen} characters). Fits within Google and social snippet limits.`,
      recommendation: 'Maintain between 120 and 160 characters.',
    });
    points += 20;
  } else if (descLen > 160) {
    checks.push({
      id: 'desc-length',
      title: 'Meta Description Length',
      status: 'warning',
      message: `Slightly long (${descLen} characters). Desktops truncate at ~160, mobiles at ~120.`,
      recommendation: 'Trim description to roughly 150-158 characters for best results.',
    });
    points += 12;
  } else if (descLen > 0) {
    checks.push({
      id: 'desc-length',
      title: 'Meta Description Length',
      status: 'warning',
      message: `Short description (${descLen} characters).`,
      recommendation: 'Aim for at least 110-120 characters to entice clicks from search users.',
    });
    points += 10;
  } else {
    checks.push({
      id: 'desc-length',
      title: 'Meta Description Length',
      status: 'error',
      message: 'Meta description is missing.',
      recommendation: 'Add a compelling description summarizing page value.',
    });
  }

  // 3. Social Image (og:image)
  if (data.imageUrl && data.imageUrl.startsWith('http')) {
    checks.push({
      id: 'og-image',
      title: 'Open Graph Image',
      status: 'good',
      message: 'Image URL is configured with full HTTPS protocol.',
      recommendation: 'Ensure your image is 1200x630 pixels (1.91:1 ratio) under 5MB.',
    });
    points += 20;
  } else if (data.imageUrl && data.imageUrl.startsWith('data:image')) {
    checks.push({
      id: 'og-image',
      title: 'Open Graph Image (Data URI)',
      status: 'warning',
      message: 'Image is a local data URI preview. Social scrapers require public absolute URLs.',
      recommendation: 'Upload this image to your CDN/host (e.g. https://yourdomain.com/og.jpg) in production.',
    });
    points += 14;
  } else {
    checks.push({
      id: 'og-image',
      title: 'Open Graph Image',
      status: 'error',
      message: 'Missing social share image.',
      recommendation: 'Posts with images receive 2.3x more social clicks. Provide an image URL.',
    });
  }

  // 4. Canonical URL
  if (data.url && (data.url.startsWith('https://') || data.url.startsWith('http://'))) {
    checks.push({
      id: 'canonical-url',
      title: 'Canonical URL',
      status: 'good',
      message: `Canonical link properly specified: ${data.url}`,
      recommendation: 'Helps prevent duplicate content penalties across protocol/www variations.',
    });
    points += 15;
  } else {
    checks.push({
      id: 'canonical-url',
      title: 'Canonical URL',
      status: 'warning',
      message: 'URL is invalid or missing scheme (https://).',
      recommendation: 'Always use absolute URLs with https:// protocol.',
    });
    points += 5;
  }

  // 5. Twitter Card Type
  if (data.twitterCard === 'summary_large_image') {
    checks.push({
      id: 'twitter-card',
      title: 'Twitter Card Format',
      status: 'good',
      message: 'Configured as summary_large_image (highest engagement on X / Twitter feeds).',
      recommendation: 'Best for modern social media engagement.',
    });
    points += 15;
  } else {
    checks.push({
      id: 'twitter-card',
      title: 'Twitter Card Format',
      status: 'good',
      message: 'Configured as summary (small square thumbnail).',
      recommendation: 'Good for text-heavy or compact feed layouts.',
    });
    points += 12;
  }

  // 6. Robots & Indexing
  if (data.robots.includes('index')) {
    checks.push({
      id: 'robots',
      title: 'Robots Directives',
      status: 'good',
      message: `Set to "${data.robots}" — Page is indexable by web crawlers.`,
      recommendation: 'Ready for Google Search crawling.',
    });
    points += 10;
  } else {
    checks.push({
      id: 'robots',
      title: 'Robots Directives',
      status: 'warning',
      message: `Set to "${data.robots}" — Search engines are asked NOT to index this page.`,
      recommendation: 'Change to "index, follow" if you want this page discoverable on search.',
    });
    points += 5;
  }

  const score = Math.min(100, Math.max(0, points));
  return { checks, score };
}
