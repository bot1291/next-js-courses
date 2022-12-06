// add domains to be able to use them in source for images

export const images = {
	remotePatterns: [
		{
			protocol: 'https',
			hostname: 'courses-top.ru',
			pathname: '/**/**',
		},
	],
};

// add svgr module to be able to add svg format as a component

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
