const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
const devMode = process.env.NODE_ENV === 'development';
module.exports = {
	mode: process.env.NODE_ENV,
	entry: ['./src/index.tsx', './src/styles.scss'],

	output: {
		filename: devMode ? '[name].js' : '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin(), 
			  new ManifestPlugin(),
			  new MiniCssExtractPlugin({}),
			  ...(devMode ? [] : [new CleanWebpackPlugin()]),
			  new CopyPlugin([
				{ 
					from: './src/assets', 
					to: './assets',
					force: true,
				},
			  ]),
			],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						  // you can specify a publicPath here
						  // by default it uses publicPath in webpackOptions.output
						  publicPath: '../',
						  filename: '[name].[hash].css',
						  chunkFilename: '[id].css',
						  hmr: devMode,
						  reloadAll: true,
						},
					  },
				  // Translates CSS into CommonJS
				  {
					  loader: 'css-loader',
					  options: {
						  url: false,
					  }
				  },
				  // Compiles Sass to CSS
				  {
					  loader: 'sass-loader',
					  options: {
						  sourceMap: devMode,
					  }
				  }
				],
				exclude: [/node_modules/]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
						  name: '[path][name]-[hash].[ext]',
						//   outputPath: '../',
						//   publicPath: '/dist',
						},
					},
				],
				exclude: [/node_modules/]
			},
			{
				test: /.(ts|tsx){1}?$/,
				loader: 'ts-loader',
				// include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			},
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	// devServer: {
	// 	open: true,
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	historyApiFallback: true,
	// 	watchContentBase: true
	// },
	watch: devMode,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 200
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss']
	}
};
