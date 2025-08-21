# @shredbx/mcp-server v0.1.0

## What & Why

This package contains a tiny, framework‑agnostic set of functions designed to be exposed by a real MCP server (hosted under your apps later). It focuses on:

- Returning minimal, predictable JSON results
- Being easy to wire into any MCP adapter or OpenAI function/tooling
- Staying small and dependency‑light for fast iteration

Think of it as the “logic layer” you plug into an MCP transport.

---

## When to Use

- To prototype MCP tools quickly without transport/server assumptions
- To reuse the same logic in multiple servers (Next.js, Node, etc.)
- To test logic from an OpenAI chat window or MCP client by wrapping these functions as tools

## When Not to Use

- If you need a full server, transports, auth, or persistence
- If your tools require framework‑specific behavior

---

## How It Works

All functions return a consistent shape:

```ts
type McpResult = { success: boolean; data?: unknown; error?: string };
```

Exports include individual functions and an aggregated registry for convenience.

```ts
import {
  rollDice,
  generateRandomString,
  getTimestamp,
  getServerInfo,
  mcpFunctions,
} from "@shredbx/mcp-server";
```

Integrating with your MCP server (pseudo‑example):

```ts
// inside your server's tool definition
server.tool("roll_dice", "Roll an N‑sided die", schema, async ({ sides }) => {
  const result = rollDice(sides);
  return result.success
    ? { content: [{ type: "text", text: JSON.stringify(result.data) }] }
    : { content: [{ type: "text", text: `Error: ${result.error}` }] };
});
```

---

## API

### rollDice(sides: number): McpResult

- sides: 2–100
- data: `{ result, sides, message }`

### generateRandomString(length: number, includeNumbers?: boolean, includeSymbols?: boolean): McpResult

- length: 1–100
- defaults: `includeNumbers = true`, `includeSymbols = false`
- data: `{ result, length, includeNumbers, includeSymbols }`

### getTimestamp(format?: "iso" | "unix" | "readable"): McpResult

- default: `"iso"`
- data: `{ timestamp, format, raw }`

### getServerInfo(): McpResult

- data: `{ name, version, functions, uptime, nodeVersion, platform }`

---

## Examples / Use‑cases

- Wire these into a Next.js route using an MCP adapter
- Expose as OpenAI tools/functions for quick chat‑window testing
- Unit test the logic without spinning up a server

---

## Development

```bash
# from repo root
pnpm install

# build once
pnpm --filter @shredbx/mcp-server build

# watch mode
pnpm --filter @shredbx/mcp-server dev

# type check
pnpm --filter @shredbx/mcp-server type-check
```

---

## References

- PatternBook methodology: `/src/packages/patternbook/README.md`
- ReactBook‑Web: `/src/apps/reactbook-web/README.md`
