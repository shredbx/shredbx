# @playground

## What & Why

PatternPlay is a package for web/Next.js experiments, demos, and examples. It serves as a playground for testing UI components, patterns, and workflows before they're integrated into production applications.

## Features

- **UI Component Testing** - Experiment with components from @ui-web
- **Pattern Validation** - Test new patterns and workflows
- **Demo Creation** - Build interactive examples
- **Rapid Prototyping** - Quick iteration on ideas

## Usage

```tsx
import { patternplayGreeting, Button } from "@playground";

export function MyExperiment() {
  return (
    <div>
      <h1>{patternplayGreeting}</h1>
      <Button>Test Button</Button>
    </div>
  );
}
```

## Dependencies

- `@ui-web` - UI components and utilities for experiments
- React 19 - For component development
- TypeScript - For type safety

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Type check
pnpm type-check
```
