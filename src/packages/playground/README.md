# @playground

## What & Why

PatternPlay is a package for web/Next.js experiments, demos, and examples. It serves as a playground for testing UI components, patterns, and workflows before they're integrated into production applications.

## Features

- **UI Component Testing** - Experiment with components from @ui-web
- **Pattern Validation** - Test new patterns and workflows
- **Demo Creation** - Build interactive examples
- **Rapid Prototyping** - Quick iteration on ideas
- **MCP Server & Client** - Model Context Protocol functionality for AI integration

## Package Structure

The playground package is organized into separate modules to avoid breaking existing clients:

```
@playground/
├── .                    # Main exports (UI components, experiments)
├── /mcp-server         # MCP server functionality (Next.js only)
└── /mcp-client         # MCP client functionality (web + React Native)
```

## Usage

### Basic Playground Features

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

### MCP Server (Next.js Only)

For server-side MCP functionality:

```tsx
import { getFAQ } from "@playground/mcp/server";

// Get all FAQ entries
const result = getFAQ();
if (result.success) {
  console.log(result.data);
}
```

### MCP Client (Web + React Native)

For client-side MCP functionality that works in both web and React Native:

```tsx
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("my-app");
await client.connect({ type: "http", url: "http://localhost:3000/mcp" });

const result = await client.callTool({
  name: "getFAQ",
  arguments: {},
});
```

## When to Use Each Module

### Use `@playground` (main export):

- UI component experiments
- Pattern testing
- Demo creation
- General playground functionality

### Use `@playground/mcp/server`:

- Next.js API routes
- Server-side MCP tools
- Backend MCP functionality
- **Not for React Native** (server-side only)

### Use `@playground/mcp-client`:

- Web applications
- React Native applications
- Cross-platform MCP client needs
- Any environment that needs to connect to MCP servers

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

## MCP Integration

The playground package includes a complete MCP (Model Context Protocol) implementation:

- **Server**: Lightweight FAQ system and extensible tool framework
- **Client**: Platform-agnostic client for web and React Native
- **Types**: Shared TypeScript interfaces for type safety

### Quick Start with MCP

1. **Server Setup** (Next.js):

```tsx
// pages/api/mcp.ts
import { getFAQ } from "@playground/mcp/server";

export default function handler(req, res) {
  const result = getFAQ();
  res.json(result);
}
```

2. **Client Usage** (Any platform):

```tsx
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("my-app");
await client.connect({ type: "http", url: "/api/mcp" });

const faq = await client.callTool({
  name: "getFAQ",
  arguments: {},
});
```

## Examples / Use-cases

- **UI Testing**: Experiment with new component patterns
- **Pattern Validation**: Test solutions before production
- **AI Integration**: Use MCP client/server for AI assistant tools
- **Cross-Platform**: Share MCP client code between web and mobile
- **Rapid Prototyping**: Quick iteration on ideas and concepts

## References

- [MCP Server Documentation](./src/mcp-server/README.md)
- [MCP Client Documentation](./src/mcp-client/README.md)
- [@ui-web](../ui-web/README.md) - UI components
- [PatternBook](../patternbook/README.md) - Pattern methodology
