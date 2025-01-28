// vite.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom', // ONLY for tests, dev mode unaffected
		globals: true, // optional if you want describe/it globally
		include: ['src/**/*.{test,spec}.{js,ts}'], // pick up test files
		setupFiles: ['src/setupTest.ts'] // if you want global test setups
	}
});
