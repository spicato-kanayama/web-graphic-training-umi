import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

let ROOT = resolve(__dirname, 'src');

// { index: 'src/index.html', about: 'src/about/index.html' } の形になるように html を設定
let html = glob.sync('**/*.html', { cwd: ROOT });
html = html.reduce((acc, cur) => {
	if (cur === 'index.html') {
		const key = cur.replace(/\.html$/, '');
		acc[key] = resolve(ROOT, cur);
		return acc;
	} else {
		const key = cur.replace(/\/index\.html$/, '');
		acc[key] = resolve(ROOT, cur);
		return acc;
	}
}, {});

// https://vitejs.dev/config/
export default defineConfig({
	root: ROOT,
	base: './',
	server: {
		host: true,
	},
	build: {
		cssMinify: false,
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: html,
			output: {
				entryFileNames: 'assets/js/[name].min.js',
				chunkFileNames: 'assets/js/[name].min.js',
				assetFileNames: (data) => {
					const name = data.names[0];

					if (/\.css$/.test(name ?? '')) {
						return 'assets/css/[name].min.css';
					} else {
						return 'assets/[name][extname]';
					}
				},
			},
		},
	},
});
