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
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
