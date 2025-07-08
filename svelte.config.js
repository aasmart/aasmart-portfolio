import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdirSync } from 'fs'

// make it so project routes work
const files = readdirSync('static/projects/');
let file_routes = files
  .filter(f => f.endsWith("md"))
  .map(f => `/projects/${f.slice(0, -3)}/`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/aasmart-portfolio' : ''
    },
    prerender: {
      entries: [
        ...file_routes,
        '/'
      ]
    }
  }
};

export default config;
