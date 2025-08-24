# Use Cases Documentation

This folder contains step-by-step workflows for common development tasks in the ReactBook monorepo. Each use case documents all files that need to be created or modified.

## Available Use Cases

### Project Setup

- [Setting Up New Monorepo](./setup-new-monorepo.md) - Complete setup from scratch
- [Configuring Development Environment](./configure-dev-environment.md) - IDE and tooling setup

### Adding New Components

- [Adding New Apps](./add-new-app.md) - Creating new Next.js applications
- [Adding New Packages](./add-new-package.md) - Creating shared packages
- [Adding Package Dependencies](./add-package-to-app.md) - Using packages in apps

### UI and Styling

- [Adding shadcn/ui to Shared UI](./add-shadcn-to-shared-ui.md) - Setting up shadcn in ui-web package
- [Adding shadcn/ui to Specific App](./add-shadcn-to-app.md) - App-specific shadcn setup
- [Managing Tailwind Configuration](./manage-tailwind-config.md) - Tailwind 4 best practices

### Configuration Management

- [Managing TypeScript Configurations](./manage-typescript-config.md) - tsconfig patterns
- [Setting Up ESLint Rules](./setup-eslint-rules.md) - Linting configuration
- [Configuring Build Pipeline](./configure-build-pipeline.md) - Turbo and build setup

### Advanced Workflows

- [Package Dependency Management](./manage-package-dependencies.md) - Shared deps patterns
- [Testing Setup](./setup-testing.md) - Jest and testing configuration
- [Deployment Configuration](./setup-deployment.md) - Production deployment

## Workflow Format

Each use case follows this structure:

1. **Overview** - What this accomplishes
2. **Prerequisites** - What must be in place first
3. **Step-by-Step Instructions** - Detailed actions
4. **Files Modified/Created** - Complete list with examples
5. **Verification** - How to confirm success
6. **Troubleshooting** - Common issues and solutions
7. **Related Use Cases** - Connected workflows

## File Naming Convention

- Use kebab-case for file names
- Prefix with action verb (add-, setup-, configure-)
- Include the component being acted upon
- Use `.md` extension for all documentation
