import { MetaTagData } from '../types';

export function generateHtmlHead(data: MetaTagData): string {
  const safeTitle = data.title || 'Untitled Page';
  const safeDesc = data.description || '';
  const safeUrl = data.url || 'https://example.com';
  const safeImage = data.imageUrl || '';
  const safeSiteName = data.siteName || '';
  const safeAuthor = data.author || '';
  const safeKeywords = data.keywords || '';

  return `<!-- Primary Meta Tags -->
<title>${escapeHtml(safeTitle)}</title>
<meta name="title" content="${escapeHtml(safeTitle)}" />
<meta name="description" content="${escapeHtml(safeDesc)}" />
${safeKeywords ? `<meta name="keywords" content="${escapeHtml(safeKeywords)}" />\n` : ''}${safeAuthor ? `<meta name="author" content="${escapeHtml(safeAuthor)}" />\n` : ''}<meta name="robots" content="${data.robots}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="${data.themeColor}" />
<link rel="canonical" href="${safeUrl}" />
${data.favicon ? `<link rel="icon" type="image/x-icon" href="${data.favicon}" />\n` : ''}
<!-- Open Graph / Facebook -->
<meta property="og:type" content="${data.ogType}" />
<meta property="og:url" content="${safeUrl}" />
<meta property="og:title" content="${escapeHtml(safeTitle)}" />
<meta property="og:description" content="${escapeHtml(safeDesc)}" />
${safeImage ? `<meta property="og:image" content="${safeImage}" />\n` : ''}${safeSiteName ? `<meta property="og:site_name" content="${escapeHtml(safeSiteName)}" />\n` : ''}<meta property="og:locale" content="${data.locale}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${data.twitterCard}" />
<meta name="twitter:url" content="${safeUrl}" />
<meta name="twitter:title" content="${escapeHtml(safeTitle)}" />
<meta name="twitter:description" content="${escapeHtml(safeDesc)}" />
${safeImage ? `<meta name="twitter:image" content="${safeImage}" />` : ''}`;
}

export function generateNextJsMetadata(data: MetaTagData): string {
  return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${escapeQuotes(data.title)}',
  description: '${escapeQuotes(data.description)}',
  metadataBase: new URL('${data.url || 'https://example.com'}'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '${escapeQuotes(data.title)}',
    description: '${escapeQuotes(data.description)}',
    url: '${data.url}',
    siteName: '${escapeQuotes(data.siteName)}',
    images: [
      {
        url: '${data.imageUrl}',
        width: 1200,
        height: 630,
        alt: '${escapeQuotes(data.title)}',
      },
    ],
    locale: '${data.locale}',
    type: '${data.ogType}',
  },
  twitter: {
    card: '${data.twitterCard}',
    title: '${escapeQuotes(data.title)}',
    description: '${escapeQuotes(data.description)}',
    images: ['${data.imageUrl}'],
  },
  robots: {
    index: ${data.robots.includes('noindex') ? 'false' : 'true'},
    follow: ${data.robots.includes('nofollow') ? 'false' : 'true'},
  },
};`;
}

export function generateNuxtHead(data: MetaTagData): string {
  return `<script setup lang="ts">
useSeoMeta({
  title: '${escapeQuotes(data.title)}',
  ogTitle: '${escapeQuotes(data.title)}',
  description: '${escapeQuotes(data.description)}',
  ogDescription: '${escapeQuotes(data.description)}',
  ogImage: '${data.imageUrl}',
  ogUrl: '${data.url}',
  twitterCard: '${data.twitterCard}',
  twitterTitle: '${escapeQuotes(data.title)}',
  twitterDescription: '${escapeQuotes(data.description)}',
  twitterImage: '${data.imageUrl}',
  themeColor: '${data.themeColor}',
});

useHead({
  link: [
    { rel: 'canonical', href: '${data.url}' },
    ${data.favicon ? `{ rel: 'icon', href: '${data.favicon}' },` : ''}
  ],
});
</script>`;
}

export function generateReactHelmet(data: MetaTagData): string {
  return `import { Helmet } from 'react-helmet-async';

export function MetaTags() {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>${escapeHtml(data.title)}</title>
      <meta name="title" content="${escapeHtml(data.title)}" />
      <meta name="description" content="${escapeHtml(data.description)}" />
      <link rel="canonical" href="${data.url}" />
      <meta name="theme-color" content="${data.themeColor}" />

      {/* Open Graph */}
      <meta property="og:type" content="${data.ogType}" />
      <meta property="og:url" content="${data.url}" />
      <meta property="og:title" content="${escapeHtml(data.title)}" />
      <meta property="og:description" content="${escapeHtml(data.description)}" />
      <meta property="og:image" content="${data.imageUrl}" />
      <meta property="og:site_name" content="${escapeHtml(data.siteName)}" />

      {/* Twitter */}
      <meta name="twitter:card" content="${data.twitterCard}" />
      <meta name="twitter:title" content="${escapeHtml(data.title)}" />
      <meta name="twitter:description" content="${escapeHtml(data.description)}" />
      <meta name="twitter:image" content="${data.imageUrl}" />
    </Helmet>
  );
}`;
}

export function generateJsonLd(data: MetaTagData): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': data.ogType === 'article' ? 'Article' : 'WebSite',
    name: data.title,
    headline: data.title,
    description: data.description,
    url: data.url,
    image: data.imageUrl,
    author: {
      '@type': 'Person',
      name: data.author || 'Prince AR Abdur Rahman',
    },
    publisher: {
      '@type': 'Organization',
      name: data.siteName || "NexVora Lab's Ofc",
    },
  };

  return `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`;
}

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeQuotes(str: string): string {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}
