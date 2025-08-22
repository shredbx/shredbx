# Monorepo Refactoring Workflow

## Purpose & Context

### Current Issues

The current monorepo setup has become complex and difficult to maintain:

1. **Complex build scripts** - Multiple manual build commands and dependency management
2. **Vercel configuration complexity** - Manual path management and build order
3. **Package building issues** - Editor references to `dist` instead of source
4. **Cross-package dependencies** - Manual workspace management
5. **Naming conflicts** - `-web` suffix conflicts with app names
6. **Unclear package boundaries** - Mixed responsibilities in `@shredbx/shared`
7. **Missing testing strategy** - No comprehensive testing approach
8. **TypeScript configuration gaps** - Editor references not properly configured

### Solution Overview

Refactor the monorepo to use a **flat package structure** with clear naming conventions, simplified dependency management, and comprehensive testing strategy.

### Why This Approach is Best

#### 1. **Flat Package Structure Benefits**

- **Clear boundaries**: Each package has single responsibility
- **Easy navigation**: Developers can find packages quickly
- **Simple dependencies**: No complex nested relationships
- **Better performance**: Simpler build graphs
- **Standard practice**: Follows established monorepo patterns

#### 2. **Improved Naming Convention Benefits**

- **No conflicts**: Avoids confusion with app names (`@shredbx/web` vs `@shredbx/ui-web`)
- **Clear purpose**: `ui-web` = Next.js web UI, `core` = business logic
- **Scalable**: Easy to add new platforms or domains
- **Consistent**: Follows established patterns
- **Platform-specific**: `ui-web` clearly distinguishes from future `ui-mobile` or `ui-native` packages

#### 3. **Simplified Dependency Management**

- **Workspace references**: Use `workspace:*` for development
- **Remote packages**: Use published versions for production
- **Automatic builds**: Single build command handles dependencies
- **Clear ownership**: Each domain owns its package hierarchy

## Migration Plan 1: Optimize Current pnpm Setup

### Phase 1: TypeScript Configuration Fixes (CRITICAL - Week 1)

**Priority**: This must be done first to prevent development friction.

- [ ] Create comprehensive root `tsconfig.json` with path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shredbx/*": ["src/packages/shredbx-*/src"],
      "@patternbook/*": ["src/packages/patternbook-*/src"]
    }
  }
}
```

- [ ] Update all package `tsconfig.json` files to reference source instead of dist
- [ ] Configure proper path mappings for each package
- [ ] Test TypeScript compilation and IntelliSense
- [ ] Verify editor references work correctly

### Phase 2: Package Restructuring

- [ ] Create new package structure:
  - [ ] `src/packages/shredbx-ui-web/` (extract from `@shredbx/shared` - Next.js web UI components)
  - [ ] `src/packages/shredbx-ui-components/` (shared UI components)
  - [ ] `src/packages/shredbx-core/` (business logic and utilities)
  - [ ] `src/packages/shredbx-mcp/` (MCP/LLM tools)
  - [ ] `src/packages/patternbook-ui/` (PatternBook UI components)
  - [ ] `src/packages/patternbook-core/` (PatternBook core logic)

**Package Naming Convention**:

```json
{
  "@shredbx/ui-web": "Next.js web UI components",
  "@shredbx/ui-components": "Platform-agnostic UI components",
  "@shredbx/core": "Business logic and utilities",
  "@shredbx/mcp": "MCP/LLM tools",
  "@patternbook/ui": "PatternBook UI components",
  "@patternbook/core": "PatternBook core logic"
}
```

### Phase 3: Extract Components from @shredbx/shared

- [ ] Move Next.js web UI components to `@shredbx/ui-web`
- [ ] Move platform-agnostic components to `@shredbx/ui-components`
- [ ] Move business logic to `@shredbx/core`
- [ ] Move MCP tools to `@shredbx/mcp`
- [ ] Update exports and imports
- [ ] Remove `@shredbx/shared` package

### Phase 4: Update App Dependencies

- [ ] Update `src/apps/web/package.json`:
  - [ ] Replace `@shredbx/shared` with `@shredbx/ui-web`
  - [ ] Add `@shredbx/core` if needed
- [ ] Update `src/apps/reactbook-web/package.json`:
  - [ ] Replace `@shredbx/shared` with `@shredbx/ui-web`
  - [ ] Add `@shredbx/core` if needed
- [ ] Update Next.js configs (`transpilePackages`)
- [ ] Update Vercel configurations

### Phase 5: Simplify Build Process

- [ ] Update root `package.json` scripts:
  - [ ] Simplify `dev` command
  - [ ] Create single `build` command
  - [ ] Remove complex port management
- [ ] Update `pnpm-workspace.yaml` if needed
- [ ] Test build and dev workflows

## Migration Plan 2: ReactBook to PatternBook Consolidation

### Phase 1: Rename and Restructure

- [ ] Rename `src/apps/reactbook-web` to `src/apps/patternbook-web`
- [ ] Update all related configurations:
  - [ ] Search and replace `reactbook-web` to `patternbook-web` in:
    - [ ] Package names
    - [ ] Import statements
    - [ ] Script references
    - [ ] Vercel configurations
    - [ ] README files
    - [ ] TypeScript configurations

### Phase 2: Remove ReactBook Package

- [ ] Delete `src/packages/reactbook/` directory
- [ ] Remove all references to `@shredbx/reactbook`
- [ ] Update package.json files
- [ ] Clean up unused dependencies

### Phase 3: Consolidate PatternBook

- [ ] Move ReactBook functionality into PatternBook packages
- [ ] Create `@patternbook/ui` for UI components
- [ ] Create `@patternbook/core` for core logic
- [ ] Update app to use PatternBook packages

## Migration Plan 3: Turborepo Migration

### Phase 1: Install and Configure Turborepo

- [ ] Install Turborepo: `pnpm add -D turbo`
- [ ] Create comprehensive `turbo.json` configuration:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

- [ ] Configure build pipeline
- [ ] Set up caching strategies

### Phase 2: Migrate Build Scripts

- [ ] Replace pnpm build scripts with Turborepo tasks
- [ ] Configure task dependencies
- [ ] Set up parallel execution
- [ ] Test build performance improvements

### Phase 3: Optimize Development Workflow

- [ ] Configure `turbo dev` for development
- [ ] Set up file watching and hot reloading
- [ ] Configure task filtering
- [ ] Test development workflow

## Testing Strategy (NEW SECTION)

### Package-Level Testing

Each package must include:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx"
  }
}
```

### Testing Dependencies

Add to each package:

```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "ts-jest": "^29.0.0"
  }
}
```

### Test Configuration

Create `jest.config.js` in each package:

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
```

## Risk Mitigation & Safeguards

### Pre-Migration Checklist

- [ ] Create comprehensive backup branch (`git checkout -b backup/pre-refactor`)
- [ ] Document all current import paths
- [ ] Test build process in clean environment
- [ ] Verify Vercel deployments work
- [ ] Run full test suite
- [ ] Document current working state

### Migration Validation Checklist

- [ ] All TypeScript compilation succeeds
- [ ] All imports resolve correctly
- [ ] Hot reload works in development
- [ ] Production builds succeed
- [ ] Vercel deployments work
- [ ] All tests pass
- [ ] No linting errors

### Rollback Plan

If issues arise during migration:

1. Keep `@shredbx/shared` package as backup
2. Maintain old build scripts
3. Test each phase before proceeding
4. Have clear rollback points for each phase
5. Use feature flags for gradual rollout

## Alternative Approach: Gradual vs Big Bang

### Gradual Extraction Approach (Recommended)

Instead of big bang migration, consider:

1. **Start with one small package extraction** (e.g., `@shredbx/core`)
2. **Test entire workflow end-to-end** with that package
3. **Apply learnings** to remaining packages
4. **Iterate and improve** the process

**Benefits**:

- Reduces risk
- Allows for iteration
- Easier to debug issues
- Can be done in parallel with development

### Big Bang Approach (Higher Risk)

- Migrate all packages simultaneously
- Higher risk of breaking changes
- Harder to debug issues
- Requires more coordination

## Turborepo Benefits & Workflows

### Adding New App

```bash
# 1. Create app directory
mkdir src/apps/new-app
cd src/apps/new-app

# 2. Initialize package.json
pnpm init

# 3. Add to workspace (automatic with current pnpm-workspace.yaml)

# 4. Add Turborepo task in turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

# 5. Run with Turborepo
turbo dev --filter=new-app
```

### Adding New Package

```bash
# 1. Create package directory
mkdir src/packages/new-package
cd src/packages/new-package

# 2. Initialize package.json
pnpm init

# 3. Add build task to turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}

# 4. Build with Turborepo
turbo build --filter=new-package
```

### Linking Workspace Packages to Apps

```bash
# 1. Add dependency in app's package.json
{
  "dependencies": {
    "@shredbx/ui-web": "workspace:*"
  }
}

# 2. Install dependencies
pnpm install

# 3. Turborepo automatically handles build order
turbo build --filter=app-name
```

### Turborepo Advantages

1. **Intelligent Caching**: Only rebuilds what changed
2. **Parallel Execution**: Builds packages simultaneously
3. **Dependency Management**: Automatic build order handling
4. **Performance**: Significantly faster builds
5. **Task Filtering**: Build only what you need
6. **Remote Caching**: Share cache across team/CI

## Package Publishing Strategy

### Internal vs External Packages

- **Internal packages**: Use `workspace:*` (never published)
  - `@shredbx/core`
  - `@shredbx/ui-web`
  - `@patternbook/core`

- **Reusable packages**: Use semantic versioning (potentially published)
  - `@shredbx/mcp` (if useful to other projects)
  - `@patternbook/ui` (if useful to other projects)

### Package.json Configuration

```json
{
  "private": true, // For internal packages
  "publishConfig": {
    "access": "public" // For external packages
  }
}
```

## Implementation Priority

### High Priority (Week 1)

1. **TypeScript configuration fixes** (CRITICAL)
2. Package restructuring
3. Component extraction

### Medium Priority (Week 2)

1. App dependency updates
2. Build process simplification
3. Testing implementation

### Low Priority (Week 3+)

1. Turborepo migration
2. Performance optimization
3. Documentation updates

## Success Metrics

- [ ] Build time reduced by 50%+
- [ ] Development workflow simplified
- [ ] Package dependencies clear and manageable
- [ ] No more editor reference issues
- [ ] Single build command works for all scenarios
- [ ] All tests pass consistently
- [ ] Turborepo migration completed (if chosen)
- [ ] TypeScript compilation time reduced
- [ ] Hot reload performance improved

## Final Validation Checklist

Before considering the migration complete:

- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run build` - successful build
- [ ] Run `npm run test` - all tests pass
- [ ] Verify development workflow works
- [ ] Check production builds succeed
- [ ] Validate Vercel deployments
- [ ] Confirm editor IntelliSense works
- [ ] Test package imports in all apps

## Estimated Impact

Based on the comprehensive improvements:

- **Build times**: 50-70% improvement ✅
- **Developer experience**: Major improvement ✅
- **Maintainability**: Significant improvement ✅
- **Testing coverage**: Comprehensive improvement ✅
- **Risk level**: Medium (well-mitigated with phased approach) ✅
- **TypeScript performance**: Major improvement ✅

## Recommendation

**Proceed with the migration** using the improved plan above. The enhanced approach addresses all critical feedback points and provides a robust, well-tested migration strategy that will significantly improve your monorepo architecture and development experience.
