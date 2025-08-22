# Packages

## What & Why

Packages contain reusable code modules organized by domain and platform. Each package serves a specific purpose and can be consumed by multiple apps without creating unnecessary rebuild dependencies.

This structure keeps builds fast, dependencies clear, and code organized — preventing the monorepo rebuild hell that comes with poorly structured shared packages.

---

## When to Use

- To share code between multiple apps
- To create platform-specific implementations (web vs mobile)
- To organize functionality by clear boundaries
- When you need precise control over what triggers app rebuilds

## When Not to Use

- For code that only one app uses (keep it in the app)
- For experimental or temporary solutions
- When the overhead of creating a package exceeds its reuse value

---

## Naming Convention

**Core packages use simple names without prefixes or suffixes** for React/Next.js components and business logic.

### Examples:

```
@patternbook             # PatternBook core functionality (no -core suffix)
@shared-web              # Shared web components & utilities (no -ui-web suffix)
@web                     # Main Next.js web application
@mobile                  # React Native mobile application (future)
```

### Package Types:

- **Core packages** — No suffixes: `patternbook`, `shared-web`
- **Platform packages** — Simple names: `web` (Next.js), `mobile` (React Native)
- **UI components** — Integrated into core packages, not separate packages
- **Utilities** — Part of core packages, not separate utility packages

### Why This Approach:

- **Simpler naming** — Easier to remember and import
- **Reduced redundancy** — Core + UI combined in single packages
- **Clearer boundaries** — One package per domain/functionality
- **Easier maintenance** — Fewer packages to manage

---

## Package Structure

Every package includes:

```
packages/package-name/
├── src/
│   ├── index.ts         # Main exports
│   └── ...              # Implementation
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript config
└── README.md            # Package documentation
```

### Simplified Structure (After Refactoring)

```
src/
├── apps/
│   └── web/                    # Single Next.js app (renamed from shredbx-web)
└── packages/
    ├── patternbook/            # PatternBook functionality (renamed from patternbook-core)
    └── shared-web/             # Shared web components & utilities (renamed from shredbx-ui-web)
```

**Key Changes:**

- **patternbook-core** → **patternbook** (no suffix)
- **shredbx-ui-web** → **shared-web** (no domain prefix)
- **shredbx-web** → **web** (simplified app name)
- **patternbook-ui-web** → **deleted** (merged into patternbook)
- **shredbx-core** → **deleted** (merged into shared-web)

### Package.json Template:

```json
{
  "name": "@patternbook",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {},
  "devDependencies": {},
  "peerDependencies": {}
}
```

**Note**: Package names now use simple names without prefixes or suffixes.

---

## Adding Dependencies

### Add workspace package to an app:

```bash
# From monorepo root
pnpm --filter @web add @shared-web

# From app directory
cd src/apps/web && pnpm add @shared-web
```

### Add external package to specific app:

```bash
pnpm --filter @shredbx/web add react-query
```

---

## Vercel Deployment Configuration

When adding package dependencies to an app, **update the app's `vercel.json`** to include the new packages in the ignore command:

### Example for web app (`src/apps/web/vercel.json`):

```json
{
  "ignoreCommand": "APP_PATH=src/apps/web PACKAGES='packages/shared-web,packages/patternbook,packages/mcp-server' bash scripts/ignore-build.sh"
}
```

### Rules:

- List only packages your app **directly depends on**
- Changes to listed packages will trigger app rebuilds
- Changes to unlisted packages will **not** trigger rebuilds
- Keep the list minimal to avoid unnecessary builds

---

## Versioning Strategy

### Development Phase (0.x.x):

- `0.1.0` — Initial working version
- `0.1.1` — Bug fixes and patches
- `0.2.0` — New features or breaking changes
- `0.x.y` — Continue until stable

### Stable Release (1.x.x):

- `1.0.0` — First stable release
- `1.0.x` — Patches (bug fixes, no breaking changes)
- `1.x.0` — Minor (new features, backward compatible)
- `x.0.0` — Major (breaking changes)

### Version Updates:

```bash
# Update specific package version
cd packages/package-name
npm version patch|minor|major

# Update multiple packages
pnpm -r version patch
```

---

## Best Practices

### Package Boundaries:

- One clear responsibility per package
- Platform-specific packages for UI components
- Shared packages for business logic and utilities
- Avoid circular dependencies

### Dependencies:

- Use `dependencies` for runtime requirements
- Use `peerDependencies` for packages the consuming app should provide
- Use `devDependencies` for build tools and types

### Exports:

- Export everything through `src/index.ts`
- Use named exports for better tree-shaking
- Avoid default exports except for single-purpose packages

---

## Examples

### Creating a new core package:

```bash
mkdir packages/patternbook
cd packages/patternbook
pnpm init
# Configure package.json with correct name and exports
```

### Using a package in an app:

```bash
# Add dependency
pnpm --filter @web add @shared-web

# Update vercel.json
# Add 'packages/shared-web' to PACKAGES list

# Import in code
import { Button } from '@shared-web'
```

---

## Anti-patterns

- **Avoid**: Catch-all "shared" or "common" packages that everything depends on
- **Avoid**: Separate UI packages (UI components should be integrated into core packages)
- **Avoid**: Circular dependencies between packages
- **Avoid**: Forgetting to update `vercel.json` after adding dependencies
- **Avoid**: Using prefixes or suffixes in core package names (use simple names like `patternbook`, not `@patternbook/core`)
- **Avoid**: Creating separate packages for utilities that could be part of core packages
