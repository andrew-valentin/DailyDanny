import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: 'build'
	},
	plugins: [sveltekit()]
});

