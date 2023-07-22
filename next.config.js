/** @type {import('next').NextConfig} */
module.exports = {
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
