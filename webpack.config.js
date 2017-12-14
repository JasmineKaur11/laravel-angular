var webpack = require('webpack');

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var inProduction = (process.env.NODE_ENV === 'production');


module.exports = {

	entry: {

		'polyfills': './resources/assets/src/polyfills.ts',

		'vendor': './resources/assets/src/vendor.ts',

		'app': './resources/assets/src/main.ts'
	},

	resolve: {

	    extensions: ['.ts', '.js']

	},

	module: {
	    rules: [
		    {
		       	test: /\.ts$/,
		        loaders: [
			        {
			            loader: 'awesome-typescript-loader',
			            options: { configFileName: path.resolve(__dirname, './resources/assets/src/tsconfig.json') }
			        } , 'angular2-template-loader'
		        ]
		    },

		    {
		        test: /\.html$/,
		        loader: 'html-loader'
		    },

		    {
		        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
		        loader: 'file-loader?name=assets/[name].[hash].[ext]'
		    },
		    
		    {
		        test: /\.css$/,
		        include: path.resolve(__dirname, './resources/assets/src/app'),
		        loader: 'raw-loader'
		    }
	    ]
	},

	output: {

	    path: path.resolve(__dirname,'./public/dist'),

	    publicPath: '/',

	    filename: '[name].js',

	    chunkFilename: '[id].chunk.js'

	},

	plugins: [
    	// Workaround for angular/angular#11580
	    new webpack.ContextReplacementPlugin(
	      // The (\\|\/) piece accounts for path separators in *nix and Windows
	      /angular(\\|\/)core(\\|\/)@angular/,
	      path.resolve(__dirname,'./resources/assets/src'), // location of your src
	      {} // a map of your routes
	    ),

	    new webpack.optimize.CommonsChunkPlugin({
	      name: ['app', 'vendor','polyfills']
	    }),

	    new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
	    // ,

	    // new HtmlWebpackPlugin({
	    //   template: path.resolve(__dirname, './resources/assets/src/index.html')
	    // })
	]

}