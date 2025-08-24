# ReactBook Knowledge Base Index

## Quick Navigation

### 🏗️ Architecture & Setup

- **[Monorepo Overview](./monorepo/README.md)** - Core architecture and technology stack
- **[Architecture Decisions](./articles/monorepo-architecture-decisions.md)** - Why we chose our current setup
- **[TypeScript Strategy](./articles/typescript-configuration-strategy.md)** - Shared configuration approach

### 🎯 Common Workflows

- **[Adding New App](./useCases/add-new-app.md)** - Create Next.js applications
- **[Adding New Package](./useCases/add-new-package.md)** - Create shared packages
- **[Package Dependencies](./useCases/add-package-to-app.md)** - Using packages in apps
- **[shadcn/ui Setup](./useCases/add-shadcn-to-shared-ui.md)** - Shared UI components

### 🎨 UI & Design System

- **[shadcn/ui Strategy](./articles/shadcn-component-strategy.md)** - Shared vs app-specific components
- **[Shared UI Setup](./useCases/add-shadcn-to-shared-ui.md)** - Core design system
- **[App-Specific UI](./useCases/add-shadcn-to-app.md)** - Custom components per app

### 🔧 Development Tools

- **[Build System](./tools/README.md)** - Turbo, PNPM, and development tooling
- **[IDE Configuration](./tools/ide-configuration.md)** - VS Code workspace setup
- **[Type Checking](./tools/type-checking.md)** - TypeScript validation

## Documentation Categories

### 📚 [Monorepo](./monorepo/)

Core architecture documentation covering the overall setup, technology choices, and project structure.

### 🎯 [Use Cases](./useCases/)

Step-by-step workflows for common development tasks with complete file examples and verification steps.

### 📖 [Articles](./articles/)

In-depth articles about architectural decisions, lessons learned, and best practices from real development experience.

### 🔧 [Tools](./tools/)

Documentation for development tools, scripts, and automation that support the monorepo workflow.

## Getting Started Paths

### New Team Member

1. [Monorepo Overview](./monorepo/README.md) - Understand the architecture
2. [IDE Configuration](./tools/ide-configuration.md) - Set up development environment
3. [Adding Package to App](./useCases/add-package-to-app.md) - Learn dependency patterns

### Adding New Feature

1. [Adding New Package](./useCases/add-new-package.md) - If creating shared functionality
2. [Adding New App](./useCases/add-new-app.md) - If creating new application
3. [shadcn/ui Setup](./useCases/add-shadcn-to-shared-ui.md) - For UI components

### Understanding Decisions

1. [Architecture Decisions](./articles/monorepo-architecture-decisions.md) - Why this setup
2. [TypeScript Strategy](./articles/typescript-configuration-strategy.md) - Configuration approach
3. [shadcn/ui Strategy](./articles/shadcn-component-strategy.md) - Component organization

## Search Tags

### By Technology

- **Next.js**: [New App](./useCases/add-new-app.md), [Architecture](./monorepo/README.md)
- **TypeScript**: [Config Strategy](./articles/typescript-configuration-strategy.md), [New Package](./useCases/add-new-package.md)
- **shadcn/ui**: [Shared Setup](./useCases/add-shadcn-to-shared-ui.md), [App Setup](./useCases/add-shadcn-to-app.md), [Strategy](./articles/shadcn-component-strategy.md)
- **Tailwind**: [Integration](./articles/tailwind-4-integration.md), [Config](./tools/README.md)
- **PNPM**: [Architecture](./articles/monorepo-architecture-decisions.md), [Scripts](./tools/pnpm-scripts.md)
- **Turbo**: [Build System](./tools/turbo-configuration.md), [Optimization](./articles/build-system-optimization.md)

### By Task Type

- **Setup**: [New App](./useCases/add-new-app.md), [New Package](./useCases/add-new-package.md), [Environment](./tools/environment-management.md)
- **Configuration**: [TypeScript](./articles/typescript-configuration-strategy.md), [Build](./tools/turbo-configuration.md)
- **Development**: [Package Dependencies](./useCases/add-package-to-app.md), [UI Components](./useCases/add-shadcn-to-shared-ui.md)
- **Architecture**: [Decisions](./articles/monorepo-architecture-decisions.md), [Patterns](./articles/dependency-management-patterns.md)

### By Component

- **Apps**: [New App](./useCases/add-new-app.md), [App-Specific UI](./useCases/add-shadcn-to-app.md)
- **Packages**: [New Package](./useCases/add-new-package.md), [Dependencies](./useCases/add-package-to-app.md)
- **UI Components**: [Shared UI](./useCases/add-shadcn-to-shared-ui.md), [Component Strategy](./articles/shadcn-component-strategy.md)
- **Configuration**: [TypeScript](./articles/typescript-configuration-strategy.md), [Tools](./tools/README.md)

## Maintenance

### Keeping Documentation Current

- Update use cases when workflows change
- Add new articles for significant architectural decisions
- Review and update tool documentation with version changes
- Ensure examples match current codebase patterns

### Contributing Guidelines

- Follow established format for each document type
- Include practical examples and code snippets
- Reference related documentation
- Update index when adding new documents

This knowledge base is designed to be:

- **Comprehensive** - Covers all major workflows and decisions
- **Actionable** - Provides step-by-step instructions
- **Searchable** - Organized for easy navigation and discovery
- **Living** - Updated as the codebase evolves
