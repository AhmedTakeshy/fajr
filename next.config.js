/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {
            protocol: 'https',
            hostname: 'okab.pixeldima.com',
        }
    ]
    }
}

module.exports = nextConfig
