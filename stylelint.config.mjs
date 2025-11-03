/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	rules: {
		'selector-class-pattern': null,
		'selector-id-pattern': null,
		'keyframes-name-pattern': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'custom-property-pattern': null,
		'declaration-property-value-no-unknown': null,
		'function-no-unknown': [
			true,
			{ ignoreFunctions: ['spx', 'pxvw', 'pxvh'] },
		],
	},
};
