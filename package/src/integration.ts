import type { AstroConfig } from "astro";
import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";
import crypto from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const integration = defineIntegration({
	name: "@url122/astro",
	optionsSchema: z.object({
		prefix : z.string().length(3).optional(), /** Prefix for the id (eg. /bcu/{id}) */
		idPrefix: z.string().length(3).optional(), /** Prefix for the id (eg. /bcu/{id}) | here for backwards compatibility w/ v1.0.0 | this will be removed in the next major release */
		subPrefix: z.string().optional(), /** sub-prefix for the id (eg. /bcu/items/{id}) */
		extraPages: z.array(z.string()).optional(), /** Extra pages to generate ids for (eg. https://bcuw.xyz/ (server generated page, not in normal url122.json)) */
	}),
	setup({options}) {
		let config: AstroConfig;
		return {
			hooks: {
				'astro:config:done': async ({ config: cfg }) => {
					config = cfg;
				},
				"astro:build:done": async ({ pages, logger, dir }) => {
					if (!config.site) {
						logger.warn(
							'The @url122/astro integration requires the `site` astro.config option. Skipping.',
						);
						return;
					};
					let prefix = options.prefix ?? options.idPrefix ?? undefined;
					if (!prefix) {
						logger.warn(
							'The @url122/astro integration requires the `prefix` astro.config option. Skipping.',
						);
						return;
					};
					if (options.subPrefix) {
						prefix += `/${options.subPrefix}`;
					};
					const site = config.site.endsWith("/") ? config.site.slice(0, -1) : config.site;
					let idMap: { [key: string]: string }[]= [];
					const allPages = pages.map((page) => `/${page.pathname}`);
					logger.info("Generating URL122 ids...");
					allPages.map((path) => idMap.push({[`${prefix}/${generateId(path)}`]: `${site}${path}`}));
					if (options.extraPages) {
						options.extraPages.map((page) => site.startsWith("http") || site.startsWith("https") ? idMap.push({[`${prefix}/${generateId(page)}`]: `${page}`}) : idMap.push({[`${prefix}/${generateId(page)}`]: `${site}${page}`}));
					}
					const jsonString = JSON.stringify(idMap, null, 2);
					logger.info("Writing URL122 ids to file...");
					const outFile = fileURLToPath(new URL(`./\.well-known`, dir));
					await mkdir(outFile);
					await writeFile(outFile + '/url122.json', jsonString);
					logger.info(`URL122 ids written to ${outFile}\\url122.json!`);
					logger.info("URL122 Finished!");
				}
			},
		};
	},
});

function generateId(path: string): string {
	// Step 1: Hash the path
	const hash = crypto.createHash('sha256').update(path).digest();
	
	// Step 2: Convert to Base62 (alphanumeric)
	const base62 = hash.toString('base64').replace(/[^a-zA-Z0-9]/g, '');
	
	// Step 3: Truncate to 6 characters
	return base62.slice(0, 6);
}