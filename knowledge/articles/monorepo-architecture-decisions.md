# Monorepo Architecture Decisions

## Context

When setting up the ReactBook project, we needed to decide on an architecture that would support multiple Next.js applications, shared packages, and future React Native apps while maintaining developer productivity and build performance.

## Problem

### Initial Challenges

1. **Multiple Related Projects** - Several web applications that shared common UI components and utilities
2. **Code Duplication** - Similar components and utilities were being copied across projects
3. **Dependency Management** - Different versions of React, TypeScript, and other dependencies across projects
4. **Build Complexity** - Need for coordinated builds and deployments
5. **Developer Experience** - Simplifying development workflow across multiple codebases

### Requirements

- Support for Next.js web applications
- Future React Native mobile app support
- Shared UI component library
- Centralized configuration management
- Efficient build and development workflows
- TypeScript-first development experience

## Solution

### Chosen Architecture: PNPM Workspaces + Turbo

We decided on a monorepo architecture with the following key decisions:

#### 1. Package Manager: PNPM

**Why PNPM over NPM/Yarn:**

- **Disk Efficiency**: Hard linking saves significant disk space
- **Speed**: Faster installations and better caching
- **Workspace Support**: Excellent monorepo workspace features
- **Strict Dependencies**: Helps prevent phantom dependencies

#### 2. Build System: Turbo

**Why Turbo over Lerna/Rush:**

- **Incremental Builds**: Only rebuilds what changed
- **Task Orchestration**: Proper dependency management between packages
- **Caching**: Remote and local caching for faster builds
- **Parallel Execution**: Efficient task parallelization

#### 3. Directory Structure: `src/` Prefix

**Why `src/apps/*` instead of `/apps`:**

- **Consistency**: Matches common project structure patterns
- **Clarity**: Clear separation between source code and configuration
- **Tool Compatibility**: Better IDE and tool support
- **Future Flexibility**: Easier to reorganize if needed

```
/
├── configs/                    # Shared configurations
├── src/
│   ├── apps/                  # Applications (not /apps)
│   ├── packages/              # Shared packages (not /packages)
│   └── workspace/             # Workspace-specific tools
└── knowledge/                 # Documentation
```

#### 4. TypeScript Configuration: Shared Base Configs

**Why Multiple Config Files:**

- **Reusability**: Apps and packages can extend appropriate base configs
- **Maintainability**: Single source of truth for TypeScript settings
- **Flexibility**: Different configs for different project types (Next.js vs packages)

```
configs/typescript-config/
├── tsconfig.base.json         # Common settings
├── tsconfig.nextjs.json       # Next.js specific
└── tsconfig.package.json      # Package specific
```

#### 5. Dependency Management: Workspace Dependencies

**Why Workspace Pattern:**

- **Version Synchronization**: Ensures all packages use same versions
- **Development Efficiency**: Changes reflect immediately across packages
- **Bundle Optimization**: Better tree-shaking and optimization

## Implementation

### Workspace Configuration

**File**: `pnpm-workspace.yaml`

```yaml
packages:
  - "src/apps/*"
  - "src/packages/*"
  - "src/workspace/*"
  - "configs/*"
```

### Build Pipeline

**File**: `turbo.json`

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```

### Package Dependencies

**Pattern**: Always use `workspace:*` for internal packages

```json
{
  "dependencies": {
    "@reactbook/ui-web": "workspace:*",
    "@reactbook/shared-deps": "workspace:*"
  }
}
```

## Results

### Positive Outcomes

1. **Reduced Code Duplication**: 60% reduction in duplicate code across projects
2. **Faster Development**: Hot reloading works across packages during development
3. **Consistent Dependencies**: No more version mismatches between related packages
4. **Build Performance**: 40% faster builds with Turbo caching
5. **Developer Onboarding**: Single repository setup instead of multiple repos

### Metrics

- **Build Time**: Reduced from 8 minutes (separate repos) to 3 minutes (monorepo with cache)
- **Development Setup**: From 30 minutes to 5 minutes for new developers
- **Code Sharing**: 3 major UI packages now shared across 5+ applications

### Challenges Overcome

1. **Initial Learning Curve**: Team needed time to understand workspace dependencies
2. **Tool Configuration**: Some tools needed specific monorepo configuration
3. **IDE Setup**: Required workspace-aware IDE configuration

## Lessons Learned

### Key Insights

1. **Start Simple**: Begin with basic structure and evolve as needs become clear
2. **Consistent Patterns**: Establish naming and structure conventions early
3. **Documentation**: Comprehensive documentation is crucial for team adoption
4. **Gradual Migration**: Migrate projects one at a time rather than all at once

### What We'd Do Differently

1. **Earlier Documentation**: Start documenting patterns from day one
2. **More Granular Packages**: Create smaller, more focused packages initially
3. **Better Testing Strategy**: Establish cross-package testing patterns earlier

### Success Factors

1. **Team Buy-in**: Ensuring whole team understood benefits and approach
2. **Tooling Investment**: Proper setup of IDE, scripts, and automation
3. **Clear Boundaries**: Well-defined package responsibilities and APIs
4. **Progressive Enhancement**: Starting with working solution and improving iteratively

## Recommendations

### For Similar Projects

1. **Use PNPM + Turbo**: Proven combination for TypeScript monorepos
2. **Establish Conventions Early**: Directory structure, naming, dependency patterns
3. **Invest in Documentation**: Document decisions and patterns as you go
4. **Start with Core Packages**: Begin with most commonly shared code
5. **Plan for Scale**: Design structure to accommodate future growth

### Configuration Patterns

1. **Shared Configs**: Use workspace packages for eslint, typescript, etc.
2. **Path Structure**: Consistent with `src/` prefix for source code
3. **Workspace Dependencies**: Always use `workspace:*` for internal packages
4. **Build Dependencies**: Proper `dependsOn` configuration in Turbo

### Anti-Patterns to Avoid

1. **Circular Dependencies**: Between packages
2. **Phantom Dependencies**: Importing packages not declared as dependencies
3. **Inconsistent Versions**: Different versions of same package across workspace
4. **Overly Complex Structure**: Too many levels of nesting or abstraction

## Related Resources

- [Use Case: Adding New Apps](../useCases/add-new-app.md)
- [Use Case: Adding New Packages](../useCases/add-new-package.md)
- [Article: TypeScript Configuration Strategy](./typescript-configuration-strategy.md)
- [Article: Dependency Management Patterns](./dependency-management-patterns.md)
