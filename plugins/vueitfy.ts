import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const Lighttheme: ThemeDefinition = {
	dark: false,
	variables: {},
	colors: {
		primary: '#1976D2',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107',
	},
};

const Darktheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#1976D2',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107',
	},
};

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components,
		directives,
		theme: {
			themes: {
				light: Lighttheme,
				dark: Darktheme,
			},
		},
	});

	nuxtApp.vueApp.use(vuetify);
});
