# ReactBook Monorepo Architecture

A modern, TypeScript-first monorepo using PNPM workspaces, Turbo, Next.js, and Tailwind 4 with shadcn/ui components.

## Core Architecture

### Technology Stack

- **Package Manager**: PNPM with workspaces
- **Build System**: Turbo for task orchestration
- **Frameworks**: Next.js 15+ for web applications
- **Styling**: Tailwind CSS 4.0 with shadcn/ui
- **TypeScript**: Strict configuration with shared configs
- **Testing**: Jest with TypeScript support

### Project Structure

```
/
├── configs/                    # Shared configurations
│   ├── eslint-config/         # ESLint configuration package
│   ├── shared-deps/           # Shared dependencies package
│   ├── shared-ui-deps/        # UI-specific shared dependencies
│   └── typescript-config/     # TypeScript configurations
├── src/
│   ├── apps/                  # Next.js applications
│   │   ├── demo-dynamic-forms-web/
│   │   └── reactbook-web/
│   ├── packages/              # Shared packages
│   │   ├── playground/        # Development utilities
│   │   └── ui-web/           # Shared UI components
│   └── workspace/            # Workspace-specific tools
└── knowledge/                 # Documentation (this folder)
```

## Package Organization

### Apps (`src/apps/`)

- **Location**: `src/apps/*` (not `/apps`)
- **Purpose**: Deployable Next.js applications
- **Dependencies**: Can use any shared packages
- **Configuration**: Each app has its own tsconfig extending base configs

### Packages (`src/packages/`)

- **Location**: `src/packages/*` (not `/packages`)
- **Purpose**: Reusable code shared across apps
- **Types**: UI components, utilities, business logic
- **Dependencies**: Should minimize external dependencies

### Configs (`configs/`)

- **Purpose**: Shared configuration packages
- **Types**: TypeScript, ESLint, shared dependencies
- **Usage**: Referenced by apps and packages

## Key Configurations

### Workspace Configuration

- **File**: `pnpm-workspace.yaml`
- **Workspaces**: `src/apps/*`, `src/packages/*`, `src/workspace/*`, `configs/*`

### Build System

- **File**: `turbo.json`
- **Tasks**: build, dev, test, type-check, lint, clean
- **Dependencies**: Proper task dependency chains

### TypeScript

- **Base Config**: `configs/typescript-config/tsconfig.base.json`
- **Next.js Config**: `configs/typescript-config/tsconfig.nextjs.json`
- **Package Config**: `configs/typescript-config/tsconfig.package.json`

## Development Principles

1. **Strict TypeScript**: No `any` types, prefer exact types or safe casting
2. **Shared Dependencies**: Use workspace packages for dependency management
3. **Path Structure**: Always use `src/` prefix for apps and packages
4. **Configuration Inheritance**: Extend base configs rather than replacing them
5. **Tailwind 4**: Latest version with shadcn/ui integration

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode for all apps
pnpm dev:all

# Start specific app
cd src/apps/reactbook-web && pnpm dev

# Run tests
pnpm test

# Type checking
pnpm type-check
```

## Related Documentation

- [Adding New Apps](../useCases/add-new-app.md)
- [Adding New Packages](../useCases/add-new-package.md)
- [Package Dependencies](../useCases/add-package-to-app.md)
- [shadcn/ui Integration](../useCases/add-shadcn-components.md)
