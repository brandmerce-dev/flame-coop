import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/beliefs`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/programs`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/admissions`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tuition-scholarship`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
