import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iveomadevelopmentnetwork.org';

  const routes = [
    '',
    '/about',
    '/impact',
    '/impact/evidence',
    '/programmes',
    '/contact',
    '/funding',
    '/partner',
    '/get-involved',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Promise((resolve) => resolve(new Date().toISOString())),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
