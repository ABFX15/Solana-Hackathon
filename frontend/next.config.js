/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        config.ignoreWarnings = [
            /HeartbeatWorker/,
            /Failed to parse input file/,
        ];
        config.module.rules.push({
            test: /HeartbeatWorker\.js$/,
            use: 'null-loader'
        });
        return config;
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

module.exports = nextConfig;
