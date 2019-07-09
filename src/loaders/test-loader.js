/* eslint-disable */
const loaderUtils = require('loader-utils');

module.exports = function (source) {
	// console.log('自定义loader',loaderUtils.getOptions(this));
	return source;
};
