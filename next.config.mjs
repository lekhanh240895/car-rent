import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig = {
  basePath: basePath,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rsmpt-qa.s3.ap-northeast-1.amazonaws.com',
        pathname: '/t3/**'
      },
      {
        protocol: 'https',
        hostname: 'xsgames.co',
        pathname: '/randomusers/**'
      }
    ]
  }
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: 'est-rouge',
    project: 'rsmpt3-qa'
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true
  }
);
