/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '3000',
            },
            {
              protocol : 'https',
              hostname: 'easy-scan-nine.vercel.app',
              port: ''
            }
          ],
    }
};

export default nextConfig;
