var webpack = require('webpack');
var version = require('./package.json').version;

module.exports = {
	entry: './src/entry',
	output: {
		path: __dirname + '/build',
		filename: 'mune.js',
		library: 'mune',
		libraryTarget: 'umd'
	}
};