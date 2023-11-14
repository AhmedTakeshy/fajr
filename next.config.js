/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {
            protocol: 'https',
            hostname: 'okab.pixeldima.com',
        },
        {
            protocol: 'https',
            hostname: 'c.wallhere.com',
        },
        {
            protocol: 'https',
            hostname: 'wallpapercave.com',
        },
    ]
    }
}

module.exports = nextConfig
