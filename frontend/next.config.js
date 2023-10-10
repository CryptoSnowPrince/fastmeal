/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: 'imgix',
		path: 'https://fastmeal.cryptosnowprince.com/',
	},
};

module.exports = nextConfig;
