# Simple Address book PWA app built with Vue and Vuetify


## Quickstart

```
npm install
npm run dev
```

### Build

```
npm run build
npm run build:client
npm run build:server
```

### Tests

```
npm run test
npm run test:unit
npm run test:e2e
npm run lint-fix
```

### Deployment
#### Build, Test & Deploy
```
npm run staging
npm run production
```

### Folder structure
* `/`
	* `assets/`, Static assets folder to be served/deployed as is.
	* `build/`, Webpack build configs
		* `webpack.base.config.js`, the build configuration used both for the client and the server
		* `webpack.client.config.js`, extends the base config to implement customizations strictly related to the client
		* `webpack.server.config.js`, same as the client one but for the server
	* `src/`, source file for the project
		* `components/`, reusable components
		* `data/`, Structured data used in componenets
		* `helpers/`, PWA helpers (possibly redundant code)
		* `images/`, images used by the application
			* These will be processed by webpack's `url-loader`
		* `mixins/`, Vue mixins (metaInfo, vue `errorHandling` via state management, scroll, typeahead)
		* `router/`, Vue-router specific files
		* `services/`, utility functions and Vue mixins
    * `store/`, Vuex specific files
		* `styles/`, global style declarations
		* `views/`, Vue components that define the layout and Views of the app
		* `App.vue`, the main/entry-point component
		* `app.js`, the script that initializes the whole App
		* `entry-client.js`, bootstrap script executed by the client only
		* `entry-server.js`, bootstrap script executed by the server only, used in SSR
		* `index.template.html`, HTML template to be used for generating App's index.html
	* `tests/`
		* `e2e/specs/`, Nightwatch e2e tests
		* `unit/specs/`, Karma+Mocha vue components unit tests
	* `dist/`, contains built files
	* `config.js`, configuration file for building the project
	* `server.js`, a standard Express server configured for SSR
