/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  publicRuntimeConfig: {
    version
  },
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/department/management",
        destination: "/department/management/account",
        permanent: true
      },
      {
        source: "/department/attendance",
        destination: "/department/attendance/management",
        permanent: true
      }
    ];
  }
};

// Injected content via Sentry wizard below

// const { withSentryConfig } = require("@sentry/nextjs");

// module.exports = withSentryConfig(
//   module.exports,
//   {
//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options

//     // Suppresses source map uploading logs during build
//     silent: true,
//     org: "growing-9x",
//     project: "javascript-nextjs"
//   },
//   {
//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,

//     // Transpiles SDK to be compatible with IE11 (increases bundle size)
//     transpileClientSDK: true,

//     // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
//     tunnelRoute: "/monitoring",

//     // Hides source maps from generated client bundles
//     hideSourceMaps: true,

//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: true
//   }
// );
