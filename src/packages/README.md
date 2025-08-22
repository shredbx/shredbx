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

All packages follow the pattern: `@[domain]-[platform|type]`

### Examples:

```
@shredbx-ui-web          # SHREDBX web UI components
@shredbx-ui-mobile       # SHREDBX mobile UI components
@shredbx-core            # SHREDBX core business logic
@shredbx-utils           # SHREDBX shared utilities
@reactbook-core          # ReactBook core functionality
@reactbook-ui-web        # ReactBook web UI components
@patternbook-core        # PatternBook core functionality
```

### Platform/Type Suffixes:

- `-web` — Web-specific implementation
- `-mobile` — React Native/mobile implementation
- `-core` — Platform-agnostic business logic
- `-ui-web` — Web UI components
- `-ui-mobile` — Mobile UI components
- `-utils` — Shared utilities
- `-types` — TypeScript type definitions
- `-config` — Configuration and constants

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

### Package.json Template:

```json
{
  "name": "@shredbx-ui-web",
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

---

## Adding Dependencies

### Add workspace package to an app:

```bash
# From monorepo root
pnpm --filter @shredbx/web add @shredbx-ui-web

# From app directory
cd src/apps/web && pnpm add @shredbx-ui-web
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
  "ignoreCommand": "APP_PATH=src/apps/web PACKAGES='packages/shredbx-ui-web,packages/shredbx-core,packages/mcp-server' bash scripts/ignore-build.sh"
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

### Creating a new UI package:

```bash
mkdir packages/shredbx-ui-mobile
cd packages/shredbx-ui-mobile
pnpm init
# Configure package.json with correct name and exports
```

### Using a package in an app:

```bash
# Add dependency
pnpm --filter @shredbx/web add @shredbx-ui-web

# Update vercel.json
# Add 'packages/shredbx-ui-web' to PACKAGES list

# Import in code
import { Button } from '@shredbx-ui-web'
```

---

## Anti-patterns

- **Avoid**: Catch-all "shared" or "common" packages that everything depends on
- **Avoid**: Platform-agnostic UI packages (web and mobile UI are fundamentally different)
- **Avoid**: Circular dependencies between packages
- **Avoid**: Forgetting to update `vercel.json` after adding dependencies
