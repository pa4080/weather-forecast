/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// https://nextjs.org/docs/messages/next-image-unconfigured-host
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:all*(svg|jpg|png|webp|webm|mkv|avi|mp4)",
				locale: false,
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=604800, s-maxage=604800, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
