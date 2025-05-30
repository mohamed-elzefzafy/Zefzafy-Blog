// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", 
//       },
//     ],
//   },
// };

// export default nextConfig;



import { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig :NextConfig =  {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);