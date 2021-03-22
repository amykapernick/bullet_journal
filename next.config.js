module.exports = {
	images: {
		deviceSizes: [500, 1000, 2500, 3000],
		domains: [],
	},
	env: {},
	target: `serverless`,
	sassOptions: {
		prependData: `
			@use "src/scss/variables.scss" as var;
		`,
	},
	webpack: (config, options) => {
		// // Netlify Plugin fix
		// if (config.externals) {
		// 	config.externals.push(`@netlify/zip-it-and-ship-it`);
		// } else {
		// 	config.externals = [`@netlify/zip-it-and-ship-it`];
		// }

		// Inline SVGs
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: `@svgr/webpack`,
					options: {
						svgoConfig: {
							plugins: [
								{ cleanupIDs: false },
								{ prefixIds: false }
							]
						}
					}
				}
			],

		});

		return config;
	  },
};
