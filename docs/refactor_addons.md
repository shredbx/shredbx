# Turborepo Migration Plan - Adjusted for Current Project Context

## Current Project Analysis

**Existing Active Packages:**

- `@shredbx/shared` - Web UI components, types, utilities (ACTIVE - needs migration)
- `@shredbx/mcp-server` - MCP server implementation (ACTIVE - keep as-is)

**Existing Active Apps:**

- `@shredbx/web` - Main web app (ACTIVE)
- `@shredbx/reactbook-web` - ReactBook web app (ACTIVE)

**Current Issues to Solve:**

- Complex build scripts with manual port management
- Editor references to `dist` instead of source files
- Mixed responsibilities in `@shredbx/shared` package
- Inactive patternbook/reactbook packages (just READMEs)

## Target Structure (Adjusted for Reality)

```
packages/
├── shredbx-ui-web/     # @shredbx/ui-web - Extract from @shredbx/shared
├── shredbx-core/       # @shredbx/core - Extract types/utils from @shredbx/shared
├── shredbx-mcp/        # @shredbx/mcp - Rename from mcp-server (keep existing)
├── patternbook-ui-web/ # @patternbook/ui-web - NEW package for PatternBook UI
└── patternbook-core/   # @patternbook/core - NEW package for PatternBook business logic

apps/
├── shredbx-web/        # @shredbx/web (rename from web)
└── patternbook-web/    # @shredbx/patternbook-web (rename from reactbook-web)
```

## Migration Steps (Adjusted for Current State)

### Phase 1: Backup and Setup (30 min)

#### 1.1 Create Backup

```bash
git checkout -b backup/pre-turborepo-migration
git push origin backup/pre-turborepo-migration
```

#### 1.2 Install Turborepo

```bash
pnpm add -D turbo
```

#### 1.3 Create turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Phase 2: Create New Package Structure (1 hour)

#### 2.1 Create Package Directories

```bash
mkdir -p packages/shredbx-ui-web/src
mkdir -p packages/shredbx-core/src
mkdir -p packages/patternbook-ui-web/src
mkdir -p packages/patternbook-core/src
```

#### 2.2 Create Package.json Files

**packages/shredbx-ui-web/package.json**:

```json
{
  "name": "@shredbx/ui-web",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.1",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.511.0",
    "next-themes": "^0.4.6",
    "tailwind-merge": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "react": "^19.0.0",
    "typescript": "^5.0.0",
    "@shredbx/config": "workspace:*"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

**packages/shredbx-core/package.json**:

```json
{
  "name": "@shredbx/core",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@shredbx/config": "workspace:*"
  }
}
```

**packages/patternbook-ui-web/package.json**:

```json
{
  "name": "@patternbook/ui-web",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "react": "^19.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

**packages/patternbook-core/package.json**:

```json
{
  "name": "@patternbook/core",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

````

### Phase 3: Create Package Structure (30 min)

#### 3.1 Create Package Structure
```bash
# Create the new package directories
mkdir -p packages/shredbx-ui-web/src
mkdir -p packages/shredbx-core/src
mkdir -p packages/patternbook-ui-web/src
mkdir -p packages/patternbook-core/src

# Each package will use its own config files
# No shared config package needed
````

### Phase 4: Migrate Existing Code from @shredbx/shared (1-2 hours)

#### 4.1 Extract UI Components to @shredbx/ui-web

```bash
# Move web components
cp -r src/packages/shared/src/components/web/* packages/shredbx-ui-web/src/
cp -r src/packages/shared/src/styles/* packages/shredbx-ui-web/src/

# Create index.ts for ui-web
cat > packages/shredbx-ui-web/src/index.ts << 'EOF'
// Export all UI components
export * from './components/web';
export * from './styles/web.css';
EOF
```

#### 4.2 Extract Core Logic to @shredbx/core

```bash
# Move types and utilities
cp -r src/packages/shared/src/types/* packages/shredbx-core/src/
cp -r src/packages/shared/src/lib/* packages/shredbx-core/src/

# Create index.ts for core
cat > packages/shredbx-core/src/index.ts << 'EOF'
// Export all business logic
export * from './types';
export * from './lib';
EOF
```

#### 4.3 Create PatternBook UI Package

```bash
# Create basic PatternBook UI structure
mkdir -p packages/patternbook-ui-web/src/components
mkdir -p packages/patternbook-ui-web/src/hooks

# Create index.ts for patternbook-ui-web
cat > packages/patternbook-ui-web/src/index.ts << 'EOF'
// Export PatternBook UI components
export * from './components';
export * from './hooks';
EOF
```

#### 4.4 Create PatternBook Core Package

```bash
# Create basic PatternBook core structure
mkdir -p packages/patternbook-core/src/types
mkdir -p packages/patternbook-core/src/lib

# Create index.ts for patternbook-core
cat > packages/patternbook-core/src/index.ts << 'EOF'
// Export PatternBook core logic
export * from './types';
export * from './lib';
EOF
```

````

### Phase 5: Update Apps (1 hour)

#### 5.1 Rename Apps to Match Naming Convention

```bash
# Rename apps to match package naming convention
mv src/apps/web src/apps/shredbx-web
mv src/apps/reactbook-web src/apps/patternbook-web
````

#### 5.2 Update App Dependencies

**src/apps/shredbx-web/package.json**:

```json
{
  "dependencies": {
    "@shredbx/ui-web": "workspace:*",
    "@shredbx/core": "workspace:*"
    // ... keep other existing dependencies
  }
}
```

**src/apps/patternbook-web/package.json**:

```json
{
  "name": "@shredbx/patternbook-web",
  "dependencies": {
    "@patternbook/ui-web": "workspace:*",
    "@patternbook/core": "workspace:*",
    "@shredbx/ui-web": "workspace:*",
    "@shredbx/core": "workspace:*"
    // ... keep other existing dependencies
  }
}
```

#### 5.3 Update Import Statements

Search and replace all imports in your apps:

```bash
# In src/apps/shredbx-web/
find . -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/@shredbx\/shared/@shredbx\/ui-web/g'

# In src/apps/patternbook-web/
find . -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/@shredbx\/shared/@shredbx\/ui-web/g'
```

#### 5.4 Update Next.js Configs

**src/apps/shredbx-web/next.config.js**:

```javascript
module.exports = {
  transpilePackages: ["@shredbx/ui-web", "@shredbx/core"],
  // ... rest of config
};
```

**src/apps/patternbook-web/next.config.js**:

```javascript
module.exports = {
  transpilePackages: [
    "@patternbook/ui-web",
    "@patternbook/core",
    "@shredbx/ui-web",
    "@shredbx/core",
  ],
  // ... rest of config
};
```

### Phase 6: Update Root Configuration (30 min)

#### 6.1 Update Root package.json

```json
{
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "test": "turbo test",
    "type-check": "turbo type-check",
    "dev:shredbx-web": "turbo dev --filter=@shredbx/web",
    "dev:patternbook-web": "turbo dev --filter=@shredbx/patternbook-web"
  }
}
```

#### 6.2 Update pnpm-workspace.yaml

```yaml
packages:
  - "src/apps/*"
  - "packages/*"
```

#### 6.3 Clean Up Old Packages

```bash
# Remove old packages after confirming migration worked
rm -rf src/packages/shredbx-shared
rm -rf src/packages/reactbook
rm -rf src/packages/patternbook
```

### Phase 7: Testing and Validation (30 min)

#### 7.1 Install Dependencies

```bash
pnpm install
```

#### 7.2 Test Build Process

```bash
turbo build
```

#### 7.3 Test Development

```bash
turbo dev
```

#### 7.4 Verify TypeScript

- Open VS Code
- Check that imports resolve correctly
- Verify IntelliSense works
- Confirm no TypeScript errors

#### 7.5 Test Individual Commands

```bash
turbo build --filter=@shredbx/ui-web
turbo dev --filter=@shredbx/web
turbo lint
```

## Validation Checklist

- [ ] All packages build successfully with `turbo build`
- [ ] Development servers start with `turbo dev`
- [ ] TypeScript compilation works without errors
- [ ] Editor IntelliSense references source files (not dist)
- [ ] Import statements resolve correctly
- [ ] Hot reload works in development
- [ ] No dependency cycle warnings
- [ ] Lint passes with `turbo lint`

## Rollback Plan

If migration fails:

1. `git checkout backup/pre-turborepo-migration`
2. Keep the backup branch until migration is fully validated
3. Each phase is reversible independently

## Benefits After Migration

1. **Simplified Build Process**: Single `turbo build` command handles all dependencies
2. **Better Development Experience**: Editor references source files directly
3. **Faster Builds**: Turborepo caching and parallelization
4. **Clear Package Boundaries**: Domain-specific packages with clear responsibilities
5. **Workspace in Dev, Remote in Production**: Already works with pnpm workspace:\* syntax
6. **Eliminated Port Conflicts**: No more manual port management

## Estimated Time

- **Total**: 4-5 hours
- **Phase 1**: 30 min (Setup)
- **Phase 2**: 1 hour (Structure)
- **Phase 3**: 30 min (Configs)
- **Phase 4**: 1-2 hours (Code migration)
- **Phase 5**: 1 hour (App updates)
- **Phase 6**: 30 min (Root config)
- **Phase 7**: 30 min (Testing)

## Next Steps After Migration

1. **Optimize Turborepo**: Configure remote caching if needed
2. **Update CI/CD**: Use `turbo build` in deployment scripts
3. **Documentation**: Update README with new structure
4. **Team Training**: Brief team on new commands and structure
5. **Add Testing**: Implement Jest testing for all packages
6. **Performance Monitoring**: Track build time improvements
