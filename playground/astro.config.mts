import tailwind from "@astrojs/tailwind";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

const { default: url122 } = await import("@url122/astro");

// https://astro.build/config
export default defineConfig({
	site: "https://example.com/",
	integrations: [
		tailwind(),
		url122(
			{
				idPrefix: "exa",
				extraPages: ["https://example.com/extra-page", "/extra-page-2"],
			}
		),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});
