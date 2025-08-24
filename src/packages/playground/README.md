# @reactbook/playground

## Overview

The Playground is an **experimental package** for ReactBook.  
It provides a space to test UI components, validate new patterns, and build interactive demos before integrating them into production apps.

---

## Features

- **UI Component Testing** – Experiment with components from `@ui-web`
- **Pattern Validation** – Try out new design and state-management patterns
- **Demo Creation** – Build interactive examples and prototypes
- **Rapid Iteration** – Test ideas quickly in isolation

---

## Usage

```tsx
import { patternplayGreeting, Button } from "@reactbook/playground";

export function MyExperiment() {
  return (
    <div>
      <h1>{patternplayGreeting}</h1>
      <Button>Click Me</Button>
    </div>
  );
}
```

---

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Type check
pnpm type-check
```

---

## Dependencies

- `@ui-web` – shared UI components
- React 19
- TypeScript

---

## Folder Structure

```
src/
├── index.ts             # Main exports (UI playground)
└── mcp/
    └── server/          # MCP server (see its own README)
```
