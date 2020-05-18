const config = require("./config")

module.exports = {
	parserOptions: {
		sourceType: "module"
	},

	extends: "standard",

	// required to lint *.vue files
	plugins: [
		"html"
	],

	env: {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jquery': true
	},
	
  globals: {
    'require': false,
		'_': false,
		'System': true
  },

	rules: {
		// don"t allow semicolons
		"semi": ["error", "never"],

		// Enable if working in windows environment to disable LB style
		// "linebreak-style": ["error", "windows"],

		// don"t require comma in the last line of an object/dictionary declaration
		"comma-dangle": ["error", "never"],

		"object-curly-spacing": ["error", "always"],

		// allow debugger; instruction during development
		"no-debugger": config.isProduction ? 2 : 0,

		// force "===" in comparisons when ambiguous
		"eqeqeq": ["error", "smart"],

		"quotes": 0,

		"indent": [2, 2],

    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // These ones should be enabled to support JSS
    'space-before-function-paren' : 0,
    'vue/html-self-closing': 'any',
    'vue/max-attributes-per-line': 'any',
    'vue/name-property-casing': 'any',
    'vue/attribute-hyphenation': 'any',
		'vue/attributes-order': 'any',
		'no-tabs': 0,
		"no-mixed-spaces-and-tabs": [0],
		"skipBlankLines": 0,
		"ignoreComments": 0,
		"no-trailing-spaces": [2, { "skipBlankLines": true }]		
	}
}
