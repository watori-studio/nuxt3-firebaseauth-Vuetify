import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			// FrieBase Setting
			FIREBASE_API_KEY: '',
			FIREBASE_AUTH_DOMAIN: '',
			FIREBASE_PROJECT_ID: '',
			// .envファイルから読み込みさせる場合
			// FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
			// FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
			// FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
		},
	},
	css: [
		'vuetify/lib/styles/main.sass',
		'mdi/css/materialdesignicons.min.css',
	],
	build: {
		transpile: ['vuetify'],
	},
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
	},
});
