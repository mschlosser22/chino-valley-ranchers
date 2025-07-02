require('dotenv').config()

//const withTM = require('next-transpile-modules')(['react-markdown', 'rehype-raw', 'hast-util-raw', 'hast-util-from-parse5', 'hastscript', 'hast-util-parse-selector', 'vfile-location', 'web-namespaces']);

module.exports = {
  async redirects() {
    return [
      {
        source: '/news/:slug',
        destination: '/:slug', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}