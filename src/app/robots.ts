import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: 'https://fajer-baghdad.vercel.app/sitemap.xml',
        host: 'https://fajer-baghdad.vercel.app',
    }
}