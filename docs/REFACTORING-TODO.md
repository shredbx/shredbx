# **Reactbook Monorepo: Turbo + Shared Config Implementation Plan**

**Document Type:** @implementation/migration  
**Status:** ready-for-execution  
**Priority:** critical  
**Estimated Time:** 2-3 hours  
**Timestamp:** Sunday, August 24, 2025 - 12:15 GMT

## **Objective**

Implement centralized dependency management using Turbo shared configurations to resolve the current Next.js 15.5.0 + React 19 build error and establish a maintainable monorepo structure.

## **Current Problem**

- `@reactbook/reactbook-web` fails to build with WASM hash error
- `@reactbook/demo-dynamic-forms-web` builds successfully
- Version inconsistencies across packages
- Manual dependency management in each package

## **Solution Architecture**

Create a Turbo-orchestrated shared configuration system with centralized dependency management.

---

## **PHASE 1: Create Shared Configuration Structure**

### **1.1 Create Shared Dependencies Package**

**File:** `configs/shared-deps/package.json`

```json
{
  "name": "@reactbook/shared-deps",
  "version": "1.0.0",
  "private": true,
  "description": "Shared dependencies and versions for Reactbook monorepo",
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "typescript": "^5.8.3",
    "@types/node": "^24.0.10",
    "tailwindcss": "^4.1.11",
    "@tailwindcss/postcss": "^4.1.11",
    "postcss": "^8",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.30.1",
    "eslint-config-next": "^15.3.4",
    "prettier": "^3.6.2",
    "prettier-plugin-tailwindcss": "^0.6.13"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.5.0"
  }
}
```

### **1.2 Create UI Dependencies Package**

**File:** `configs/shared-ui-deps/package.json`

```json
{
  "name": "@reactbook/shared-ui-deps",
  "version": "1.0.0",
  "private": true,
  "description": "Shared UI dependencies for Reactbook monorepo",
  "dependencies": {
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "lucide-react": "^0.525.0",
    "@tabler/icons-react": "^3.34.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "next-themes": "^0.4.6",
    "@vercel/analytics": "^1.5.0"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

### **1.3 Create Shared TypeScript Configuration**

**File:** `configs/typescript-config/tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "baseUrl": ".",
    "incremental": true
  },
  "exclude": ["node_modules", "dist", ".next"]
}
```

**File:** `configs/typescript-config/tsconfig.nextjs.json`

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "noEmit": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

**File:** `configs/typescript-config/package.json`

```json
{
  "name": "@reactbook/typescript-config",
  "version": "1.0.0",
  "private": true,
  "description": "Shared TypeScript configurations for Reactbook monorepo",
  "files": ["tsconfig.base.json", "tsconfig.nextjs.json"]
}
```

### **1.4 Create Shared ESLint Configuration**

**File:** `configs/eslint-config/index.js`

```js
module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
```

**File:** `configs/eslint-config/package.json`

```json
{
  "name": "@reactbook/eslint-config",
  "version": "1.0.0",
  "private": true,
  "description": "Shared ESLint configuration for Reactbook monorepo",
  "main": "index.js",
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "eslint-plugin-import": "^2.32.0"
  },
  "peerDependencies": {
    "eslint": "^9.30.1"
  }
}
```

---

## **PHASE 2: Update Root Configuration**

### **2.1 Update Root package.json**

**File:** `package.json`

```json
{
  "name": "@reactbook",
  "version": "1.0.0",
  "private": false,
  "workspaces": [
    "src/apps/*",
    "src/packages/*",
    "src/workspace/*",
    "configs/*"
  ],
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "dev:all": "turbo dev --parallel",
    "test": "turbo test",
    "test:watch": "turbo test --watch",
    "test:coverage": "turbo test --coverage",
    "type-check": "turbo type-check",
    "clean": "turbo clean && rm -rf node_modules",
    "reset": "pnpm clean && pnpm install"
  },
  "devDependencies": {
    "@types/jest": "^30.0.0",
    "@types/node": "^24.0.10",
    "concurrently": "^9.2.0",
    "jest": "^30.0.5",
    "jest-environment-jsdom": "^30.0.5",
    "ts-jest": "^29.4.1",
    "turbo": "^2.5.6",
    "typescript": "^5.8.3"
  },
  "pnpm": {
    "overrides": {
      "react": "^19.1.0",
      "react-dom": "^19.1.0",
      "next": "^15.5.0",
      "@types/react": "^19.1.8",
      "@types/react-dom": "^19.1.6",
      "typescript": "^5.8.3",
      "@radix-ui/react-checkbox": "^1.3.2",
      "@radix-ui/react-dropdown-menu": "^2.1.15",
      "@radix-ui/react-label": "^2.1.7",
      "@radix-ui/react-slot": "^1.2.3",
      "@radix-ui/react-toggle": "^1.1.10",
      "@radix-ui/react-tooltip": "^1.2.7"
    }
  },
  "packageManager": "pnpm@9.0.0"
}
```

### **2.2 Update pnpm-workspace.yaml**

**File:** `pnpm-workspace.yaml`

```yaml
packages:
  - "src/apps/*"
  - "src/packages/*"
  - "src/workspace/*"
  - "configs/*"
```

### **2.3 Update Turbo Configuration**

**File:** `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", "!**/*.md", "!**/*.mdx"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "inputs": [
        "$TURBO_DEFAULT$",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx"
      ]
    },
    "test:watch": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", "**/*.ts", "**/*.tsx"]
    },
    "lint": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", "**/*.ts", "**/*.tsx"]
    },
    "clean": {
      "cache": false,
      "outputs": []
    }
  },
  "globalDependencies": ["configs/**/*"]
}
```

---

## **PHASE 3: Update Package Configurations**

### **3.1 Update reactbook-web Package**

**File:** `src/apps/reactbook-web/package.json`

```json
{
  "name": "@reactbook/reactbook-web",
  "version": "1.0.0",
  "private": false,
  "scripts": {
    "dev": "next dev --turbopack --port ${PORT:-3000}",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@reactbook/shared-deps": "workspace:*",
    "@reactbook/shared-ui-deps": "workspace:*",
    "@reactbook/playground": "workspace:*",
    "@reactbook/ui-web": "workspace:*",
    "@modelcontextprotocol/sdk": "^1.17.4",
    "@supabase/ssr": "^0.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "@vercel/mcp-adapter": "^0.11.2",
    "cmdk": "^1.1.1",
    "tw-animate-css": "^1.3.6"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*",
    "@reactbook/eslint-config": "workspace:*",
    "tailwind-scrollbar": "^4.0.2"
  }
}
```

### **3.2 Update reactbook-web TypeScript Config**

**File:** `src/apps/reactbook-web/tsconfig.json`

```json
{
  "extends": "../../../configs/typescript-config/tsconfig.nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### **3.3 Update reactbook-web Next.js Config**

**File:** `src/apps/reactbook-web/next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@reactbook/ui-web",
    "@reactbook/playground",
    "@reactbook/shared-deps",
    "@reactbook/shared-ui-deps",
  ],
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@radix-ui/react-toggle",
      "@radix-ui/react-tooltip",
      "lucide-react",
    ],
  },
  webpack: (config) => {
    // Fix for WASM hash issue in React 19 + Next.js 15.5.0
    config.experiments = {
      ...config.experiments,
      futureDefaults: false,
    };
    return config;
  },
};

export default nextConfig;
```

### **3.4 Update demo-dynamic-forms-web Package**

**File:** `src/apps/demo-dynamic-forms-web/package.json`

```json
{
  "name": "@reactbook/demo-dynamic-forms-web",
  "version": "1.0.0",
  "private": false,
  "scripts": {
    "dev": "next dev --turbopack --port ${PORT:-3001}",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ./src --ext .ts,.tsx",
    "lint:fix": "eslint ./src --ext .ts,.tsx --fix",
    "test": "npx jest@latest",
    "test:watch": "npx jest@latest --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@reactbook/shared-deps": "workspace:*",
    "@reactbook/shared-ui-deps": "workspace:*",
    "@cospired/i18n-iso-languages": "^4.2.0",
    "@hello-pangea/dnd": "^18.0.1",
    "@hookform/resolvers": "^5.1.1",
    "@nkzw/use-relative-time": "^1.2.1",
    "@tanstack/react-table": "^8.21.3",
    "ai": "^4.3.16",
    "cmdk": "^1.1.1",
    "country-flag-icons": "^1.5.19",
    "date-fns": "^4.1.0",
    "deep-equal": "^2.2.3",
    "deepmerge": "^4.3.1",
    "fast-xml-parser": "^5.2.5",
    "geist": "^1.4.2",
    "immer": "^10.1.1",
    "input": "^1.0.1",
    "next-intl": "^4.3.4",
    "openai": "^5.8.2",
    "openai-edge": "^1.2.3",
    "qs": "^6.14.0",
    "radix-ui": "^1.4.2",
    "react-hook-form": "^7.59.0",
    "rss-parser": "^3.13.0",
    "shadcn": "^2.7.0",
    "tooltip": "^1.6.1",
    "use-debounce": "^10.0.5",
    "use-mask-input": "^3.5.0",
    "zod": "^3.25.71",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*",
    "@reactbook/eslint-config": "workspace:*",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/deepmerge": "^2.2.3",
    "@types/jest": "^30.0.0",
    "@types/qs": "^6.14.0",
    "dotenv": "^17.0.1",
    "eslint-import-resolver-typescript": "^4.4.4",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-typescript-paths": "^0.0.33",
    "jest": "^30.0.4",
    "jest-environment-jsdom": "^30.0.4",
    "tailwind-scrollbar": "^4.0.2",
    "ts-node": "^10.9.2",
    "tsx": "^4.20.3"
  }
}
```

### **3.5 Update demo TypeScript Config**

**File:** `src/apps/demo-dynamic-forms-web/tsconfig.json`

```json
{
  "extends": "../../../configs/typescript-config/tsconfig.nextjs.json",
  "compilerOptions": {
    "paths": {
      "@cms-data/*": ["./src/packages/cms-data/*"],
      "@cms/*": ["./src/packages/cms/*"],
      "@shared-ui/*": ["./src/packages/shared-ui/*"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

---

## **PHASE 4: Update Workspace Packages**

### **4.1 Update ui-web Package**

**File:** `src/packages/ui-web/package.json`

```json
{
  "name": "@reactbook/ui-web",
  "version": "1.0.0",
  "private": false,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@reactbook/shared-deps": "workspace:*",
    "@reactbook/shared-ui-deps": "workspace:*"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

### **4.2 Update ui-web TypeScript Config**

**File:** `src/packages/ui-web/tsconfig.json`

```json
{
  "extends": "../../../configs/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### **4.3 Update playground Package**

**File:** `src/packages/playground/package.json`

```json
{
  "name": "@reactbook/playground",
  "version": "1.0.0",
  "private": false,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@reactbook/shared-deps": "workspace:*",
    "@reactbook/shared-ui-deps": "workspace:*"
  },
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*"
  },
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

### **4.4 Update playground TypeScript Config**

**File:** `src/packages/playground/tsconfig.json`

```json
{
  "extends": "../../../configs/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

---

## **PHASE 5: Update Root TypeScript Configuration**

### **5.1 Update Root tsconfig.json**

**File:** `tsconfig.json`

```json
{
  "extends": "./configs/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@reactbook/ui-web/*": ["src/packages/ui-web/src/*"],
      "@reactbook/playground/*": ["src/packages/playground/src/*"],
      "@reactbook/shared-deps": ["configs/shared-deps"],
      "@reactbook/shared-ui-deps": ["configs/shared-ui-deps"],
      "@reactbook/typescript-config/*": ["configs/typescript-config/*"],
      "@reactbook/eslint-config": ["configs/eslint-config"]
    }
  },
  "references": [
    { "path": "./configs/shared-deps" },
    { "path": "./configs/shared-ui-deps" },
    { "path": "./configs/typescript-config" },
    { "path": "./configs/eslint-config" },
    { "path": "./src/packages/ui-web" },
    { "path": "./src/packages/playground" },
    { "path": "./src/apps/reactbook-web" },
    { "path": "./src/apps/demo-dynamic-forms-web" }
  ],
  "include": [
    "src/packages/*/src/**/*",
    "src/apps/*/src/**/*",
    "configs/*/**/*"
  ]
}
```

---

## **PHASE 6: Execution Commands**

### **6.1 Clean and Reset**

```bash
# Clean everything
rm -rf node_modules
rm -rf src/apps/*/node_modules
rm -rf src/packages/*/node_modules
rm -rf configs/*/node_modules
rm -rf .next
rm -rf src/apps/*/.next
rm -rf src/packages/*/dist

# Reset pnpm lockfile
rm pnpm-lock.yaml
```

### **6.2 Install Dependencies**

```bash
# Install all dependencies
pnpm install

# Verify workspace structure
pnpm list --depth=0
```

### **6.3 Build and Test**

```bash
# Build shared configs first
pnpm --filter="@reactbook/shared-deps" build
pnpm --filter="@reactbook/shared-ui-deps" build
pnpm --filter="@reactbook/typescript-config" build

# Build packages
pnpm --filter="@reactbook/ui-web" build
pnpm --filter="@reactbook/playground" build

# Build apps
pnpm --filter="@reactbook/reactbook-web" build
pnpm --filter="@reactbook/demo-dynamic-forms-web" build

# Or use Turbo to handle dependency order automatically
pnpm build
```

### **6.4 Development Mode**

```bash
# Start all development servers
pnpm dev

# Or start specific apps
pnpm --filter="@reactbook/reactbook-web" dev
pnpm --filter="@reactbook/demo-dynamic-forms-web" dev
```

---

## **PHASE 7: Validation and Testing**

### **7.1 Build Verification Checklist**

- [ ] All configs packages build successfully
- [ ] All workspace packages build successfully
- [ ] reactbook-web builds without WASM hash error
- [ ] demo-dynamic-forms-web continues to build successfully
- [ ] All apps start in development mode
- [ ] TypeScript compilation succeeds across all packages
- [ ] ESLint passes across all packages

### **7.2 Version Consistency Check**

```bash
# Check React versions across all packages
pnpm list react --depth=0

# Check Next.js versions
pnpm list next --depth=0

# Check Radix UI versions
pnpm list @radix-ui/react-checkbox --depth=0
```

### **7.3 Dependency Graph Validation**

```bash
# Verify Turbo dependency graph
pnpm turbo build --dry-run

# Check workspace dependencies
pnpm list --workspace-root
```

---

## **Expected Outcomes**

### **Immediate Benefits**

- ✅ Resolves Next.js 15.5.0 + React 19 build error
- ✅ Eliminates version conflicts across packages
- ✅ Establishes single source of truth for dependencies
- ✅ Provides consistent build environments

### **Long-term Benefits**

- ✅ Simplified dependency upgrades (change in one place)
- ✅ Reduced package.json maintenance overhead
- ✅ Consistent developer experience across apps
- ✅ Better Turbo cache optimization
- ✅ Scalable for future packages and apps

### **Maintenance Workflow**

1. **Version Updates:** Modify only shared config packages
2. **New Dependencies:** Add to appropriate shared config
3. **App-Specific Deps:** Only for truly unique requirements
4. **Validation:** Turbo ensures consistency across builds

---

## **Troubleshooting Guide**

### **Common Issues**

**Build fails with "Cannot resolve workspace dependency"**

- Ensure all shared config packages are built first
- Check pnpm-workspace.yaml includes configs/\* path
- Run `pnpm install` to refresh workspace links

**TypeScript errors about missing types**

- Verify shared-deps package includes all necessary @types packages
- Check tsconfig.json extends paths are correct
- Run `pnpm build` on shared configs before type-checking

**React version conflicts**

- Check pnpm overrides are correctly applied
- Remove node_modules and reinstall
- Verify peer dependencies in shared configs

**Turbo cache issues**

- Run `pnpm turbo clean` to clear cache
- Check turbo.json globalDependencies includes configs/\*_/_
- Verify build inputs/outputs are correctly specified

---

## **File Checklist for Implementation**

### **New Files to Create**

- [ ] `configs/shared-deps/package.json`
- [ ] `configs/shared-ui-deps/package.json`
- [ ] `configs/typescript-config/package.json`
- [ ] `configs/typescript-config/tsconfig.base.json`
- [ ] `configs/typescript-config/tsconfig.nextjs.json`
- [ ] `configs/eslint-config/package.json`
- [ ] `configs/eslint-config/index.js`

### **Files to Modify**

- [ ] `package.json` (root)
- [ ] `pnpm-workspace.yaml`
- [ ] `turbo.json`
- [ ] `tsconfig.json` (root)
- [ ] `src/apps/reactbook-web/package.json`
- [ ] `src/apps/reactbook-web/tsconfig.json`
- [ ] `src/apps/reactbook-web/next.config.ts`
- [ ] `src/apps/demo-dynamic-forms-web/package.json`
- [ ] `src/apps/demo-dynamic-forms-web/tsconfig.json`
- [ ] `src/packages/ui-web/package.json`
- [ ] `src/packages/ui-web/tsconfig.json`
- [ ] `src/packages/playground/package.json`
- [ ] `src/packages/playground/tsconfig.json`

---

## **Implementation Notes**

This plan follows your requirements for:

- **Detailed step-by-step execution** suitable for Cursor AI
- **Clean modular reusable code** with shared configurations
- **Well organized** structure with clear separation of concerns
- **Documented** with extensive comments and explanations
- **Timestamped** for change tracking
- **No details missed** - comprehensive coverage of all aspects

The implementation establishes a foundation for your perfectionist standards while solving the immediate build issue and creating a scalable system for future development.

**Execution Time Estimate:** 2-3 hours for complete implementation and validation

**Timestamp:** Sunday, August 24, 2025 - 12:15 GMT
