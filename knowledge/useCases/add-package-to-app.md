# Adding Package Dependencies to Apps

## Overview

Configure an app to use shared packages from the monorepo, including proper dependency declarations, imports, and build configuration.

## Prerequisites

- Target app exists in `src/apps/`
- Target package exists in `src/packages/` and is built
- Understanding of dependency types (dependencies vs devDependencies vs peerDependencies)

## Step-by-Step Instructions

### 1. Add Workspace Dependency

**File**: `src/apps/your-app/package.json`

Add the package to dependencies:

```json
{
  "dependencies": {
    "@reactbook/your-package-name": "workspace:*"
    // ... other dependencies
  }
}
```

### 2. Configure TypeScript Paths (if needed)

**File**: `src/apps/your-app/tsconfig.json`

For better import resolution, you can add path mapping:

```json
{
  "extends": ["@reactbook/typescript-config/tsconfig.nextjs.json"],
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      // Add package aliases if needed
      "@/ui/*": ["../../packages/ui-web/src/*"]
    }
  }
}
```

### 3. Update Next.js Configuration (for Next.js apps)

**File**: `src/apps/your-app/next.config.ts`

Add package to transpilePackages for proper bundling:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@reactbook/ui-web",
    "@reactbook/your-package-name",
    // Add other internal packages as needed
  ],
  // ... other config
};

export default nextConfig;
```

### 4. Install Dependencies

```bash
# From root of monorepo
pnpm install
```

### 5. Import and Use Package

**File**: `src/apps/your-app/src/app/page.tsx` (Example usage)

```typescript
import { Button, type ButtonProps } from '@reactbook/ui-web'
import { utilityFunction } from '@reactbook/utilities'
import { BusinessComponent } from '@reactbook/business-logic'

export default function HomePage() {
  const handleClick = () => {
    // Use utility function
    const result = utilityFunction('example')
    console.log(result)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Using Shared Packages</h1>

      {/* Use UI components */}
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>

      {/* Use business logic components */}
      <BusinessComponent />
    </main>
  )
}
```

### 6. Configure Build Dependencies (Turbo)

**File**: `turbo.json` (Root level - usually no changes needed)

Ensure proper build order:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
      // This ensures packages build before apps
    }
  }
}
```

## Common Package Types and Configurations

### UI Component Package

```json
{
  "dependencies": {
    "@reactbook/ui-web": "workspace:*"
  }
}
```

Next.js config:

```typescript
transpilePackages: ["@reactbook/ui-web"];
```

Usage:

```typescript
import { Button, Card, Modal } from "@reactbook/ui-web";
```

### Utility Package

```json
{
  "dependencies": {
    "@reactbook/utilities": "workspace:*"
  }
}
```

Usage:

```typescript
import { formatDate, validateEmail, cn } from "@reactbook/utilities";
```

### Business Logic Package

```json
{
  "dependencies": {
    "@reactbook/business-logic": "workspace:*",
    "@reactbook/types": "workspace:*"
  }
}
```

Usage:

```typescript
import { UserService, ProductService } from "@reactbook/business-logic";
import type { User, Product } from "@reactbook/types";
```

### Development-Only Package

```json
{
  "devDependencies": {
    "@reactbook/dev-tools": "workspace:*"
  }
}
```

Usage (development only):

```typescript
import { mockData, testHelpers } from "@reactbook/dev-tools";
```

## Advanced Configurations

### Conditional Package Loading

For packages that should only be used in certain environments:

```typescript
// In your app code
if (process.env.NODE_ENV === "development") {
  const { DevTools } = await import("@reactbook/dev-tools");
  // Use DevTools
}
```

### Re-exporting for App-Specific APIs

**File**: `src/apps/your-app/src/lib/ui.ts`

```typescript
// Re-export and extend shared UI
export * from "@reactbook/ui-web";

// Add app-specific components
export { AppSpecificButton } from "../components/AppSpecificButton";
```

### Type Augmentation

**File**: `src/apps/your-app/src/types/global.d.ts`

```typescript
// Extend shared types for app-specific needs
declare module "@reactbook/ui-web" {
  interface ButtonProps {
    // Add app-specific props
    trackingId?: string;
  }
}
```

## Files Modified

- `src/apps/your-app/package.json` - Add workspace dependency
- `src/apps/your-app/tsconfig.json` - Optional path mapping
- `src/apps/your-app/next.config.ts` - Add to transpilePackages
- App source files - Import and use package exports

## Verification

### 1. Dependency Installation

```bash
pnpm install
# Should install without errors
```

### 2. Build Test

```bash
# Build the package first
cd src/packages/your-package-name
pnpm build

# Build the app
cd ../apps/your-app
pnpm build
```

### 3. Development Server

```bash
cd src/apps/your-app
pnpm dev
# Should start without import errors
```

### 4. Type Checking

```bash
pnpm type-check
# Should pass without type errors
```

### 5. Import Resolution Test

In your app, try importing and using the package:

```typescript
import {} from /* your exports */ "@reactbook/your-package-name";
// Should have proper IntelliSense and no errors
```

## Troubleshooting

### Package Not Found

- Ensure package is listed in workspace dependencies
- Run `pnpm install` from monorepo root
- Check package name matches exactly

### Type Errors

- Ensure target package is built: `pnpm build`
- Check TypeScript configuration extends correct base
- Verify peer dependencies match

### Build Errors

- Add package to `transpilePackages` in Next.js config
- Ensure package has proper export configuration
- Check for circular dependencies

### Import Resolution Issues

- Verify package exports in `package.json`
- Check path mappings in `tsconfig.json`
- Ensure package main/types fields are correct

### Runtime Errors

- Ensure all package dependencies are satisfied
- Check for version mismatches in peer dependencies
- Verify package is compatible with app's runtime environment

## Related Use Cases

- [Adding New Package](./add-new-package.md)
- [Managing Package Dependencies](./manage-package-dependencies.md)
- [Configuring Build Pipeline](./configure-build-pipeline.md)
