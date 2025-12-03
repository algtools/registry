# Unified Registry Browser

A Next.js application that allows you to browse and use components from multiple shadcn registries in one place. This project is based on the [shadcn registry-template](https://github.com/shadcn-ui/registry-template) and extends it to support multiple registries.

## Features

- 🎨 Browse components from multiple shadcn registries
- 🔄 Switch between different registries seamlessly
- 📦 Build and serve your own custom registry
- 🚀 Compatible with the `shadcn` CLI
- 🌐 Proxy support for external registries

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the registry browser.

## Building Your Registry

To build your registry and generate the static JSON files:

```bash
pnpm registry:build
```

This will generate registry files in the `public/r/` directory that are compatible with the `shadcn` CLI.

## Adding Registries

Edit `registries-config.json` to add or remove registries:

```json
{
	"registries": [
		{
			"id": "official",
			"name": "Official shadcn/ui",
			"url": "https://ui.shadcn.com",
			"registryUrl": "https://ui.shadcn.com/registry/index.json",
			"description": "The official shadcn/ui component registry",
			"enabled": true
		},
		{
			"id": "custom",
			"name": "Custom Registry",
			"url": "/",
			"registryUrl": "/api/registry",
			"description": "Custom components registry",
			"enabled": true
		}
	]
}
```

### Registry Configuration

- `id`: Unique identifier for the registry
- `name`: Display name for the registry
- `url`: Base URL of the registry website
- `registryUrl`: URL to fetch the registry JSON (can be local `/api/registry` or external)
- `description`: Description shown in the UI
- `enabled`: Whether this registry is active

## Project Structure

```
.
├── registry.json              # Main registry definition
├── registries-config.json     # Configuration for multiple registries
├── components.json            # shadcn CLI configuration
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── registry/     # API routes for serving registries
│   │   ├── page.tsx          # Main page with registry browser
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/               # shadcn UI components
│   │   └── registry-browser.tsx  # Main registry browser component
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── registry/             # Your custom registry components
│       └── new-york/
│           └── blocks/
└── public/
    └── r/                    # Built registry files (generated)
```

## Using with shadcn CLI

To use your custom registry with the shadcn CLI, configure it in your project's `components.json`:

```json
{
	"$schema": "https://ui.shadcn.com/schema.json",
	"style": "new-york",
	"rsc": true,
	"tsx": true,
	"tailwind": {
		"config": "",
		"css": "app/globals.css",
		"baseColor": "neutral",
		"cssVariables": true,
		"prefix": ""
	},
	"aliases": {
		"components": "@/components",
		"utils": "@/lib/utils",
		"ui": "@/components/ui",
		"lib": "@/lib",
		"hooks": "@/hooks"
	},
	"iconLibrary": "lucide"
}
```

Then set your registry URL:

```bash
pnpm dlx shadcn@latest add button --registry https://your-domain.com
```

## Adding Components

1. Create your component in `src/registry/new-york/blocks/your-component/`
2. Add an entry to `registry.json`:

```json
{
	"name": "your-component",
	"type": "registry:component",
	"title": "Your Component",
	"description": "Description of your component",
	"registryDependencies": [],
	"files": [
		{
			"path": "registry/new-york/blocks/your-component/your-component.tsx",
			"type": "registry:component"
		}
	]
}
```

3. Run `npm run registry:build` to build the registry
4. The component will be available at `/r/your-component.json`

## Deployment

This project is configured for Cloudflare Workers deployment. To deploy:

```bash
npm run deploy
```

For other platforms, use standard Next.js deployment methods.

## Learn More

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
