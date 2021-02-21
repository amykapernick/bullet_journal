const path = require(`path`),
	 Dotenv = require(`dotenv-webpack`);

module.exports = {
	entry: `./src/index.js`,
	output: {
		filename: `main.js`,
		path: path.resolve(__dirname, `dist`)
	},
	devServer: {
		contentBase: path.resolve(__dirname, `dist`),
	},
	resolve: {
		extensions: [`*`, `.js`, `.jsx`],
	},
	plugins: [
		new Dotenv({
			safe: `true`
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [`babel-loader`],
			},
			{
				test: /\.ttf$/,
				use: {
					loader: `url-loader`,
				},
			},
			{
				test: /\.scss$/i,
				use: [
					`style-loader`,
					`css-loader`,
					`sass-loader`,
				],
			},
		],
	}
};
