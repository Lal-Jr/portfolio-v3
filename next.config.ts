import type { NextConfig } from "next";

// The blog is a separate app (Express + Vite client) built with base "/blog/".
// Requests to /blog/* are proxied to it with the "/blog" prefix stripped.
const BLOG_URL = (process.env.BLOG_URL ?? "https://braindump-spring-sun-9859.fly.dev").replace(/\/$/, "");

const nextConfig: NextConfig = {
	experimental: {
		// The blog is proxied through here, including admin media uploads. Next's default request-body
		// limit for rewrites is 10 MB (larger uploads fail after a 30 s hang), so raise it.
		proxyClientMaxBodySize: "30mb",
		proxyTimeout: 120_000,
	},
	async rewrites() {
		return [
			{ source: "/blog", destination: `${BLOG_URL}/` },
			{ source: "/blog/:path*", destination: `${BLOG_URL}/:path*` },
		];
	},
};

export default nextConfig;
