# Adding New Package

## Overview

Creates a new shared package in the monorepo with proper TypeScript configuration, build setup, and dependency management.

## Prerequisites

- Monorepo setup complete
- Shared configuration packages available
- Understanding of package purpose (UI, utilities, business logic, etc.)

## Step-by-Step Instructions

### 1. Create Package Directory Structure

```bash
mkdir -p src/packages/your-package-name/src
cd src/packages/your-package-name
```

### 2. Create package.json

**File**: `src/packages/your-package-name/package.json`

```json
{
  "name": "@reactbook/your-package-name",
  "version": "1.0.0",
  "private": false,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    // Add runtime dependencies as needed
    // Example for UI package:
    // "@reactbook/shared-ui-deps": "workspace:*"
    // Example for utility package:
    // "@reactbook/shared-deps": "workspace:*"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*",
    "typescript": "^5.8.3"
  },
  "peerDependencies": {
    // Add peer dependencies based on package type
    // Example for React components:
    // "react": "^19.1.0",
    // "react-dom": "^19.1.0"
  }
}
```

### 3. Configure TypeScript

**File**: `src/packages/your-package-name/tsconfig.json`

```json
{
  "extends": "@reactbook/typescript-config/tsconfig.package.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 4. Create Main Export File

**File**: `src/packages/your-package-name/src/index.ts`

```typescript
// Export all public APIs from this file
// Example exports:

// For utility functions:
// export * from './utils'
// export * from './types'

// For React components:
// export * from './components'
// export * from './hooks'

// For specific exports:
// export { Button } from './components/Button'
// export type { ButtonProps } from './components/Button'

// Placeholder export
export const packageName = "your-package-name";
```

### 5. Create Basic Structure (Example for UI Package)

**File**: `src/packages/your-package-name/src/components/index.ts`

```typescript
// Export all components
export * from "./Button";
// Add more component exports as needed
```

**File**: `src/packages/your-package-name/src/components/Button.tsx`

```typescript
import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
    >
      {children}
    </button>
  )
}
```

### 6. Create Types (if needed)

**File**: `src/packages/your-package-name/src/types/index.ts`

```typescript
// Define shared types for this package
export interface CommonProps {
  className?: string;
  children?: React.ReactNode;
}

// Export specific types
export type Variant = "primary" | "secondary" | "tertiary";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
```

### 7. Create Utilities (if needed)

**File**: `src/packages/your-package-name/src/utils/index.ts`

```typescript
// Utility functions for this package
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Add more utilities as needed
```

### 8. Update Main Export

**File**: `src/packages/your-package-name/src/index.ts` (Updated)

```typescript
// Components
export * from "./components";

// Types
export * from "./types";

// Utilities
export * from "./utils";

// Package metadata
export const packageVersion = "1.0.0";
```

### 9. Add README (Optional but Recommended)

**File**: `src/packages/your-package-name/README.md`

````markdown
# @reactbook/your-package-name

Brief description of what this package provides.

## Installation

This package is part of the ReactBook monorepo and is available via workspace dependencies:

```json
{
  "dependencies": {
    "@reactbook/your-package-name": "workspace:*"
  }
}
```
````

## Usage

```typescript
import { ComponentName } from "@reactbook/your-package-name";

// Usage examples
```

## API Reference

### Components

- `ComponentName` - Description

### Types

- `TypeName` - Description

### Utilities

- `functionName` - Description

````

## Files Created
- `src/packages/your-package-name/package.json`
- `src/packages/your-package-name/tsconfig.json`
- `src/packages/your-package-name/src/index.ts`
- `src/packages/your-package-name/src/components/index.ts`
- `src/packages/your-package-name/src/components/Button.tsx`
- `src/packages/your-package-name/src/types/index.ts`
- `src/packages/your-package-name/src/utils/index.ts`
- `src/packages/your-package-name/README.md`

## Verification

1. **Install dependencies**:
   ```bash
   pnpm install
````

2. **Build the package**:

   ```bash
   cd src/packages/your-package-name
   pnpm build
   ```

3. **Verify build output**:

   ```bash
   ls dist/
   # Should show: index.js, index.d.ts, and other compiled files
   ```

4. **Type check**:

   ```bash
   pnpm type-check
   ```

5. **Test usage in an app**:
   ```bash
   # In an app's package.json
   # Add: "@reactbook/your-package-name": "workspace:*"
   # Then import and use in the app
   ```

## Package Types and Variations

### UI Component Package

- Include `@reactbook/shared-ui-deps` dependency
- Add React peer dependencies
- Include Tailwind classes or CSS modules

### Utility Package

- Include `@reactbook/shared-deps` for common utilities
- No React dependencies
- Focus on pure functions and types

### Business Logic Package

- May include both UI and utility dependencies
- Can have database or API dependencies
- Often includes TypeScript interfaces for data models

## Troubleshooting

### Build Errors

- Ensure TypeScript configuration extends the correct base config
- Check that all imports resolve correctly
- Verify dependencies are properly declared

### Import Errors in Apps

- Ensure package is built before use: `pnpm build`
- Check workspace dependency declaration in consuming app
- Verify export paths in package's `index.ts`

### Type Declaration Issues

- Ensure `declaration: true` in TypeScript config
- Check that types are properly exported
- Verify peer dependencies match consuming app versions

## Related Use Cases

- [Adding Package to App](./add-package-to-app.md)
- [Managing Package Dependencies](./manage-package-dependencies.md)
- [Adding shadcn/ui to Shared UI](./add-shadcn-to-shared-ui.md)
