module.exports = {
	entry: "./src/index.jsx",
	mode: process.env.WEBPACK_MODE || "production",
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: "babel-loader"
		}],
	},
	optimization: {
		usedExports: true,
	},
	output: {
		filename: "index.js",
		path: __dirname + "/dist",
	},
};