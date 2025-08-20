# @shredbx/shared

## What & Why

This package contains **shared React components and utilities** used across ShredBX applications. It provides a centralized library for cross-project references, UI components, and common functionality that can be consumed by both web and React Native applications.

## When to Use

- To share UI components across multiple ShredBX applications
- For cross-project references and navigation
- To maintain consistent design patterns and utilities
- When building reusable components that work across web and mobile

## When Not to Use

- For app-specific components that won't be reused
- For business logic that's tightly coupled to a single application
- For experimental components that haven't been tested across platforms

## How It Works

- Provides modular React components optimized for both web and React Native
- Exports components through platform-specific paths (`/components/web`, `/components/native`)
- Includes TypeScript definitions for all project types and configurations
- Uses shadcn/ui component patterns for consistency

## Components

### ProjectReference

A card component for referencing other ShredBX projects with logo, title, and description.

### ProjectsReferenceCatalog

A responsive catalog that displays all projects except the current one. Features:

- Horizontal scroll layout on desktop
- Vertical stack layout on mobile
- Automatic exclusion of current project
- Customizable title and styling

## Types

### ProjectType

Union type defining available projects: `'shredbx' | 'reactbook'`

### ProjectInfo

Interface defining project metadata including ID, name, URL, description, and logo path.

## Examples / Use-cases

```tsx
import { ProjectsReferenceCatalog } from "@shredbx/shared/components/web";

// Display other projects at bottom of page
<ProjectsReferenceCatalog
  currentProject="shredbx"
  title="Explore our other projects"
/>;
```

```tsx
import { ProjectReference } from "@shredbx/shared/components/web";

// Single project reference
<ProjectReference project="reactbook" />;
```

## References

- [Web App](/src/apps/web/README.md)
- [ReactBook Web](/src/apps/reactbook-web/README.md)
- [PatternBook methodology](/src/packages/patternbook/README.md)
