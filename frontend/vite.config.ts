// vite.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom', // ONLY for tests, dev mode unaffected
		globals: true, // optional if you want describe/it globally
		setupFiles: ['src/setupTest.ts'],
		include: ['src/**/*.{test,spec}.{js,ts}'] // pick up test files
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	}
}));
