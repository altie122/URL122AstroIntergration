# `@url122/astro`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that generates id's for the url122.xyz site to use.

## Usage

### Prerequisites

An astro project

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add @url122/astro
```

```bash
npx astro add @url122/astro
```

```bash
yarn astro add @url122/astro
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add @url122/astro
```

```bash
npm install @url122/astro
```

```bash
yarn add @url122/astro
```

2. Add the integration to your astro config

```diff
+import integration from "@url122/astro";

export default defineConfig({
  integrations: [
+    integration(),
  ],
});
```

### Configuration

There is one configuration option called "idPrefix" you MUST have it for the intergration to work.
```
idPrefix: String; // this MUST be 3 char's long
```
## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/altie122/URL122AstroIntergration/blob/main/LICENSE). Made with ❤️ by [Altie122](https://github.com/altie122).

<!-- ## Acknowledgements

TODO: -->
