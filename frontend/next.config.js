/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',
	images: {
		loader: 'imgix',
		path: 'https://fastmeal.cryptosnowprince.com',
	},
};

module.exports = nextConfig;
