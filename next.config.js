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
      // Vanity URL for the Jammy Egg launch. /jammy is the page itself; this
      // is the products-path alias the business asked for.
      //
      // 307 rather than 308: a permanent redirect is cached by browsers
      // indefinitely and cannot be withdrawn, so if this alias is ever
      // repointed -- at a real /products/jammyeggs page, say -- anyone who
      // visited it once would keep landing on /jammy. Worth revisiting once
      // the URL has settled.
      {
        source: '/products/jammyeggs',
        destination: '/jammy',
        permanent: false,
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