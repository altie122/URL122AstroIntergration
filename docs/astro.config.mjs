// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import url122 from '@url122/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.url122.xyz',
	integrations: [
		starlight({
			title: 'docs | URL122',
			favicon: '/URL122.png',
			logo: {
				src: './src/assets/URL122.png',
				replacesTitle: true,
			},
			// social: {
			// 	github: 'https://github.com/withastro/starlight',
			// },
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Basic Guide', slug: 'guides/basic' },
						{ label: 'Astro Integration Guide', slug: 'guides/astro' },
					],
				},
			],
		}),
		url122(
			{
				prefix: 'url'
			}
		),
	],
});
