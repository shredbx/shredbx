# Refactoring TODO - Cleanup & Redundancy Removal

## Overview

This document outlines the refactoring steps to clean up the monorepo structure, remove redundancy, and simplify package organization. Focus is on cleanup only - no improvements or new features.

## Phase 1: App Consolidation

### 1.1 Remove patternbook-web app

- [x] Delete `/src/apps/patternbook-web` directory completely
- [x] Remove any references to patternbook-web in workspace configuration
- [x] Update any build scripts or CI/CD that reference patternbook-web
- [x] **Note**: Patternbook functionality will be rendered inside reactbook-web app

## Phase 2: Package Simplification & Renaming

### 2.1 Patternbook Package Consolidation

- [x] **2.1.1a**: Move any implementation from `patternbook-ui-web` to `patternbook-core`
  - [x] Check if patternbook-ui-web has actual implementation (currently seems to be just index.ts)
  - [x] If implementation exists, move it to patternbook-core
  - [x] If no implementation, proceed to deletion
- [x] **2.1.1b**: Delete `patternbook-ui-web` package completely
  - [x] Remove `/src/packages/patternbook-ui-web` directory
  - [x] Remove from workspace configuration
  - [x] Remove from any app dependencies
- [x] **2.1.1c**: Rename `patternbook-core` to `patternbook`
  - [x] Rename directory from `patternbook-core` to `patternbook`
  - [x] Update package.json name from `@patternbook/core` to `@patternbook`
  - [x] Update all import statements across the codebase
  - [x] Update workspace references
  - [x] Update any app dependencies

### 2.2 ReactBook Package Consolidation

- [x] **2.2.1**: Move content from `reactbook-core` to `reactbook-ui-web`
  - [x] Move all source files from reactbook-core to reactbook-ui-web
  - [x] Update package.json dependencies and exports
  - [x] Ensure no functionality is lost during move
- [x] **2.2.2**: Rename `reactbook-ui-web` to `ui-web`
  - [x] Rename directory from `reactbook-ui-web` to `ui-web`
  - [x] Update package.json name from `@reactbook/ui-web` to `@reactbook/ui-web`
  - [x] Update all import statements across the codebase
  - [x] Update workspace references
  - [x] Update any app dependencies
  - [x] **Note**: This package will contain Next.js specific code in a subfolder

### 2.3 App Renaming

- [x] **2.3.1**: Rename `reactbook-web` to `web`
  - [x] Rename directory from `reactbook-web` to `web`
  - [x] Update package.json name from `@reactbook/web` to `@web`
  - [x] Update all import statements across the codebase
  - [x] Update workspace references
  - [x] Update any CI/CD or deployment configurations
  - [x] **Note**: This will be the single Next.js web app, everything else rendered within it

## Phase 3: Cleanup & Verification

### 3.1 Dependency Updates

- [x] Update all package.json files with new package names
- [x] Update all import statements throughout the codebase
- [x] Update workspace configuration files
- [x] Update any build scripts or CI/CD configurations

### 3.2 Testing & Verification

- [x] Ensure all builds still work after refactoring
- [x] Verify no functionality was lost during moves
- [x] Check that all imports resolve correctly
- [x] Verify workspace dependencies are correctly configured

### 3.3 Documentation Updates

- [ ] Update README.md files to reflect new structure
- [ ] Update any architecture documentation
- [ ] Update any setup or development guides

## Notes & Rules

### Package Naming Convention (Updated)

- **No prefixes or suffixes** for core packages: `patternbook`, `ui-web`
- **Specific platform packages** when needed: `web` (Next.js), `mobile` (React Native)
- **Core packages** contain business logic and platform-agnostic code
- **UI packages** contain platform-specific components

### Final Structure

```
src/
├── apps/
│   └── web/                    # Single Next.js app (renamed from reactbook-web)
└── packages/
    ├── patternbook/            # Patternbook functionality (renamed from patternbook-core)
    ├── ui-web/                 # Web UI components & utilities (renamed from reactbook-ui-web)
    └── mcp-server/             # MCP server functionality (kept descriptive name)
```

### Important Considerations

- **No new features** - this is cleanup only
- **Preserve all existing functionality** during moves
- **Update all references** to avoid broken imports
- **Test thoroughly** after each major change
- **Keep commits small** and focused on single refactoring steps

### Corrections Made

- **@mcp-server** → **@reactbook/mcp-server** (kept domain prefix and descriptive name for clarity)
- **mcp** → **mcp-server** (directory renamed back to descriptive name following best practices)
