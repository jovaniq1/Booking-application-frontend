/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: false,
  env: {
    customKey: 'my-value',
  },
  assetPrefix: isProd
    ? 'https://cdn.statically.io/gh/jovaniq1/jovaniq1.github.io/gh-pages/'
    : '',
};

module.exports = nextConfig;
