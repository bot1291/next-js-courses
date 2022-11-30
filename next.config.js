export const images = {
	remotePatterns: [
		{
			protocol: 'https',
			hostname: 'courses-top.ru',
			port: '',
			pathname: '/**/**',
		},
	],
};
export function webpack(config) {
	config.module.rules.push({
		loader: '@svgr/webpack',
		issuer: /\.[jt]sx?$/,
		options: {
			prettier: false,
			svgo: true,
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
			titleProp: true,
		},
		test: /\.svg$/,
	});

	return config;
}
