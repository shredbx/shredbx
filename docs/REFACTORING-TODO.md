# Refactoring TODO - Cleanup & Redundancy Removal

## Overview

This document outlines the refactoring steps to clean up the monorepo structure, remove redundancy, and simplify package organization. Focus is on cleanup only - no improvements or new features.

## Phase 1: App Consolidation

### 1.1 Remove patternbook-web app

- [ ] Delete `/src/apps/patternbook-web` directory completely
- [ ] Remove any references to patternbook-web in workspace configuration
- [ ] Update any build scripts or CI/CD that reference patternbook-web
- [ ] **Note**: Patternbook functionality will be rendered inside shredbx-web app

## Phase 2: Package Simplification & Renaming

### 2.1 Patternbook Package Consolidation

- [ ] **2.1.1a**: Move any implementation from `patternbook-ui-web` to `patternbook-core`
  - [ ] Check if patternbook-ui-web has actual implementation (currently seems to be just index.ts)
  - [ ] If implementation exists, move it to patternbook-core
  - [ ] If no implementation, proceed to deletion
- [ ] **2.1.1b**: Delete `patternbook-ui-web` package completely
  - [ ] Remove `/src/packages/patternbook-ui-web` directory
  - [ ] Remove from workspace configuration
  - [ ] Remove from any app dependencies
- [ ] **2.1.1c**: Rename `patternbook-core` to `patternbook`
  - [ ] Rename directory from `patternbook-core` to `patternbook`
  - [ ] Update package.json name from `@patternbook/core` to `@patternbook`
  - [ ] Update all import statements across the codebase
  - [ ] Update workspace references
  - [ ] Update any app dependencies

### 2.2 Shredbx Package Consolidation

- [ ] **2.2.1**: Move content from `shredbx-core` to `shredbx-ui-web`
  - [ ] Move all source files from shredbx-core to shredbx-ui-web
  - [ ] Update package.json dependencies and exports
  - [ ] Ensure no functionality is lost during move
- [ ] **2.2.2**: Rename `shredbx-ui-web` to `shared-web`
  - [ ] Rename directory from `shredbx-ui-web` to `shared-web`
  - [ ] Update package.json name from `@shredbx/ui-web` to `@shared-web`
  - [ ] Update all import statements across the codebase
  - [ ] Update workspace references
  - [ ] Update any app dependencies
  - [ ] **Note**: This package will contain Next.js specific code in a subfolder

### 2.3 App Renaming

- [ ] **2.3.1**: Rename `shredbx-web` to `web`
  - [ ] Rename directory from `shredbx-web` to `web`
  - [ ] Update package.json name from `@shredbx/web` to `@web`
  - [ ] Update all import statements across the codebase
  - [ ] Update workspace references
  - [ ] Update any CI/CD or deployment configurations
  - [ ] **Note**: This will be the single Next.js web app, everything else rendered within it

## Phase 3: Cleanup & Verification

### 3.1 Dependency Updates

- [ ] Update all package.json files with new package names
- [ ] Update all import statements throughout the codebase
- [ ] Update workspace configuration files
- [ ] Update any build scripts or CI/CD configurations

### 3.2 Testing & Verification

- [ ] Ensure all builds still work after refactoring
- [ ] Verify no functionality was lost during moves
- [ ] Check that all imports resolve correctly
- [ ] Verify workspace dependencies are correctly configured

### 3.3 Documentation Updates

- [ ] Update README.md files to reflect new structure
- [ ] Update any architecture documentation
- [ ] Update any setup or development guides

## Notes & Rules

### Package Naming Convention (Updated)

- **No prefixes or suffixes** for core packages: `patternbook`, `shared-web`
- **Specific platform packages** when needed: `web` (Next.js), `mobile` (React Native)
- **Core packages** contain business logic and platform-agnostic code
- **UI packages** contain platform-specific components

### Final Structure

```
src/
├── apps/
│   └── web/                    # Single Next.js app (renamed from shredbx-web)
└── packages/
    ├── patternbook/            # Patternbook functionality (renamed from patternbook-core)
    └── shared-web/             # Shared web components & utilities (renamed from shredbx-ui-web)
```

### Important Considerations

- **No new features** - this is cleanup only
- **Preserve all existing functionality** during moves
- **Update all references** to avoid broken imports
- **Test thoroughly** after each major change
- **Keep commits small** and focused on single refactoring steps
