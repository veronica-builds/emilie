import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    // Widen the bundler root to the repo so the canonical built-in-workflows
    // JSON in backend/src/lib can be imported (single source of truth).
    turbopack: {
        root: path.join(__dirname, ".."),
    },
    async rewrites() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap/sitemap.xml",
            },
            {
                source: "/sitemap_:slug.xml",
                destination: "/api/sitemap/sitemap_:slug.xml",
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
