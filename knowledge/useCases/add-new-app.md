# Adding New Next.js App

## Overview

Creates a new Next.js application in the monorepo with proper TypeScript configuration, shared dependencies, and build pipeline integration.

## Prerequisites

- Monorepo setup complete
- Shared configuration packages available
- Turbo build system configured

## Step-by-Step Instructions

### 1. Create App Directory Structure

```bash
mkdir -p src/apps/your-app-name/src/app
cd src/apps/your-app-name
```

### 2. Create package.json

**File**: `src/apps/your-app-name/package.json`

```json
{
  "name": "@reactbook/your-app-name",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start",
    "type-check": "tsc --noEmit",
    "lint": "next lint"
  },
  "dependencies": {
    "@reactbook/shared-deps": "workspace:*",
    "@reactbook/ui-web": "workspace:*",
    "next": "^15.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*",
    "@reactbook/eslint-config": "workspace:*",
    "@types/node": "^24.0.10",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "eslint": "^9.0.0",
    "typescript": "^5.8.3"
  }
}
```

### 3. Configure TypeScript

**File**: `src/apps/your-app-name/tsconfig.json`

```json
{
  "extends": ["@reactbook/typescript-config/tsconfig.nextjs.json"],
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/utils/*": ["./utils/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. Configure Next.js

**File**: `src/apps/your-app-name/next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable any experimental features needed
  },
  transpilePackages: [
    "@reactbook/ui-web",
    // Add other internal packages as needed
  ],
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable ESLint during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
```

### 5. Configure ESLint

**File**: `src/apps/your-app-name/eslint.config.mjs`

```javascript
import { reactbookConfig } from "@reactbook/eslint-config";

export default [
  ...reactbookConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

### 6. Setup Tailwind (if using)

**File**: `src/apps/your-app-name/postcss.config.mjs`

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**File**: `src/apps/your-app-name/tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Include shared UI components
    "../../packages/ui-web/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your theme customizations
    },
  },
  plugins: [],
};

export default config;
```

### 7. Create Basic App Structure

**File**: `src/apps/your-app-name/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Description of your app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
```

**File**: `src/apps/your-app-name/src/app/page.tsx`

```typescript
export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Welcome to Your App</h1>
      <p>Your Next.js app is ready!</p>
    </main>
  )
}
```

**File**: `src/apps/your-app-name/src/app/globals.css`

```css
@import "tailwindcss";
```

### 8. Add TypeScript Declaration

**File**: `src/apps/your-app-name/next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

### 9. Update Root Package.json (if needed)

Ensure the workspace includes your new app in the root `package.json`:

```json
{
  "workspaces": ["src/apps/*", "src/packages/*", "src/workspace/*", "configs/*"]
}
```

### 10. Update Turbo Configuration

No changes needed - `src/apps/*` pattern already covers new apps.

## Files Created

- `src/apps/your-app-name/package.json`
- `src/apps/your-app-name/tsconfig.json`
- `src/apps/your-app-name/next.config.ts`
- `src/apps/your-app-name/eslint.config.mjs`
- `src/apps/your-app-name/postcss.config.mjs`
- `src/apps/your-app-name/tailwind.config.ts`
- `src/apps/your-app-name/next-env.d.ts`
- `src/apps/your-app-name/src/app/layout.tsx`
- `src/apps/your-app-name/src/app/page.tsx`
- `src/apps/your-app-name/src/app/globals.css`

## Verification

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Build the app**:

   ```bash
   cd src/apps/your-app-name
   pnpm build
   ```

3. **Start development server**:

   ```bash
   pnpm dev
   ```

4. **Run type checking**:

   ```bash
   pnpm type-check
   ```

5. **Verify in browser**: Visit http://localhost:3000

## Troubleshooting

### Dependencies Not Found

- Ensure `pnpm install` was run from the root
- Check workspace configuration in root `package.json`

### TypeScript Errors

- Verify `@reactbook/typescript-config` is installed
- Check paths configuration in `tsconfig.json`

### Build Failures

- Ensure all shared packages are built first: `pnpm build` from root
- Check Turbo task dependencies in `turbo.json`

## Related Use Cases

- [Adding Package Dependencies](./add-package-to-app.md)
- [Adding shadcn/ui to App](./add-shadcn-to-app.md)
- [Configuring Build Pipeline](./configure-build-pipeline.md)
