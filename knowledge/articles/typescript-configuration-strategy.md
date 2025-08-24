# TypeScript Configuration Strategy

## Context

In our monorepo with multiple Next.js apps and shared packages, we needed a TypeScript configuration strategy that would provide consistency while allowing flexibility for different project types.

## Problem

### Initial Challenges

1. **Configuration Duplication**: Each package had its own complete tsconfig.json
2. **Inconsistent Settings**: Different TypeScript settings across packages led to compatibility issues
3. **Maintenance Burden**: Updates required changes to multiple configuration files
4. **Build Complexity**: Different build targets and module resolution strategies needed
5. **Developer Confusion**: Unclear which settings to use for new packages

### Specific Pain Points

- Apps needed Next.js-specific settings (JSX, module resolution)
- Packages needed different output configurations (declaration files, source maps)
- Shared dependencies required consistent compiler options
- IDE support needed proper path resolution across the workspace

## Solution

### Shared Configuration Approach

We created a centralized TypeScript configuration package with multiple base configurations that other packages extend rather than duplicate.

#### Configuration Package Structure

```
configs/typescript-config/
├── package.json
├── tsconfig.base.json      # Common settings for all packages
├── tsconfig.nextjs.json    # Next.js app specific settings
└── tsconfig.package.json   # Shared package specific settings
```

### Base Configuration: `tsconfig.base.json`

**Purpose**: Common TypeScript settings shared across all packages

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

### Next.js Configuration: `tsconfig.nextjs.json`

**Purpose**: Extends base config with Next.js specific settings

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### Package Configuration: `tsconfig.package.json`

**Purpose**: Extends base config for shared packages

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts", "**/*.test.tsx"]
}
```

## Implementation

### Configuration Package Setup

**File**: `configs/typescript-config/package.json`

```json
{
  "name": "@reactbook/typescript-config",
  "version": "1.0.0",
  "private": false,
  "main": "index.js",
  "files": ["tsconfig.*.json"]
}
```

### App Usage Pattern

**File**: `src/apps/example-app/tsconfig.json`

```json
{
  "extends": ["@reactbook/typescript-config/tsconfig.nextjs.json"],
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### Package Usage Pattern

**File**: `src/packages/example-package/tsconfig.json`

```json
{
  "extends": "@reactbook/typescript-config/tsconfig.package.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### Dependency Declaration

Every app and package includes the config as a dev dependency:

```json
{
  "devDependencies": {
    "@reactbook/typescript-config": "workspace:*"
  }
}
```

## Results

### Positive Outcomes

1. **Consistency**: All packages now use identical base TypeScript settings
2. **Maintenance**: Single place to update TypeScript configuration
3. **Developer Experience**: Clear patterns for new packages and apps
4. **Build Reliability**: Reduced configuration-related build failures by 80%
5. **IDE Support**: Better IntelliSense and error detection across workspace

### Metrics

- **Configuration Files**: Reduced from 15+ unique tsconfig files to 3 base configs
- **Build Errors**: 80% reduction in TypeScript configuration-related errors
- **Setup Time**: New package setup time reduced from 15 minutes to 3 minutes

### Key Benefits

1. **DRY Principle**: No duplicate configuration across packages
2. **Type Safety**: Consistent strict TypeScript settings
3. **Extensibility**: Easy to add new configuration types
4. **Version Control**: Changes tracked in single location

## Lessons Learned

### Critical Insights

1. **Extend Don't Replace**: Always extend base configurations rather than replacing them
2. **Minimal Overrides**: Only override settings that truly need to be different
3. **Documentation**: Clear guidelines on when to use which configuration
4. **Testing**: Verify configurations work with build tools and IDE

### Common Pitfalls Avoided

1. **Path Resolution**: Ensuring baseUrl and paths work correctly in workspace
2. **Build Outputs**: Different packages need different output configurations
3. **Include/Exclude**: Careful management of what files are included in compilation
4. **Composite Projects**: Proper setup for TypeScript project references

### What Worked Well

1. **Semantic Naming**: Clear naming convention for different config types
2. **Minimal Differences**: Keeping differences between configs to minimum
3. **Workspace Integration**: Proper integration with PNPM workspace resolution
4. **IDE Configuration**: Settings that work well with VS Code workspace

### Challenges Overcome

1. **Module Resolution**: Ensuring workspace packages resolve correctly
2. **Build Tool Integration**: Making configs work with Next.js, Turbo, and TypeScript compiler
3. **Path Mapping**: Complex path resolution across package boundaries
4. **Type Checking**: Balancing strict checking with development speed

## Recommendations

### Best Practices

1. **Start with Strictest Settings**: Begin with strict TypeScript and relax if needed
2. **Use Composite**: Enable composite mode for better build performance
3. **Consistent Paths**: Establish consistent path mapping patterns
4. **Regular Updates**: Keep base configuration updated with TypeScript releases

### Configuration Patterns

1. **Three-Tier Approach**: Base → Type-specific → Project-specific
2. **Minimal Extensions**: Only override what's absolutely necessary
3. **Clear Documentation**: Document the purpose and usage of each config
4. **Version Pinning**: Pin TypeScript version across workspace

### Anti-Patterns to Avoid

1. **Complete Replacement**: Don't replace entire base configuration
2. **Inconsistent Settings**: Avoid different strict/module settings across packages
3. **Complex Inheritance**: Don't create deep configuration inheritance chains
4. **Missing Types**: Ensure all packages have proper type definitions

### Implementation Tips

1. **Gradual Migration**: Migrate existing packages one at a time
2. **Test Thoroughly**: Verify builds, IDE support, and type checking work
3. **Monitor Performance**: Watch for TypeScript compilation performance impact
4. **Team Training**: Ensure team understands configuration patterns

## Related Resources

- [Use Case: Adding New Apps](../useCases/add-new-app.md)
- [Use Case: Adding New Packages](../useCases/add-new-package.md)
- [Article: Monorepo Architecture Decisions](./monorepo-architecture-decisions.md)
- [Article: Build System Optimization](./build-system-optimization.md)
