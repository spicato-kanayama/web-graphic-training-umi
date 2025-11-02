const postcssPresetEnv = require('postcss-preset-env');
const postcssCustomMedia = require('postcss-custom-media');

const pxvw = (px, base = 390) => {
	// 小数点第2位を四捨五入
	return `${Math.round((px / base) * 10000) / 100}vw`;
};

const spx = (size) => {
	return `calc(${size} * var(--px))`;
};

module.exports = {
	plugins: [
		postcssPresetEnv({
			features: {
				'nesting-rules': true,
			},
		}),
		postcssCustomMedia(),
		require('postcss-import'),
		require('autoprefixer'),
		require('postcss-functions')({
			functions: {
				pxvw,
				spx,
			},
		}),
	],
};
