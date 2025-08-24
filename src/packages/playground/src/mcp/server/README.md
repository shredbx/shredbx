# MCP Server for @reactbook/playground

## Overview

The MCP Server provides **Model Context Protocol (MCP)** tools for the Playground.  
It’s lightweight, type-safe, and focused on exposing utilities (currently an FAQ system) that can be consumed by MCP clients, API routes, or React components.

---

## Features

- **FAQ System** – Predefined questions and answers about ReactBook
- **Simple API** – Easy-to-use function interface
- **Type Safe** – Full TypeScript support
- **Extensible** – Add new tools with minimal setup

---

## Current Tools

### `getFAQ()`

Returns all available FAQ entries.

```ts
import { getFAQ } from "@reactbook/playground/mcp/server";

const result = getFAQ();
if (result.success) {
  console.log(result.data);
}
```

### `getFAQText(question: string)`

Looks up a specific FAQ entry.

```ts
import { getFAQText } from "@reactbook/playground/mcp/server";

const answer = getFAQText("Story of reactbook?");
if (answer) console.log(answer);
```

---

## Integration Examples

### With Next.js API Route

```ts
// pages/api/faq.ts
import { getFAQ } from "@reactbook/playground/mcp/server";

export default function handler(req, res) {
  const result = getFAQ();
  result.success ? res.json(result) : res.status(500).json(result);
}
```

### With React Component

```tsx
import { useEffect, useState } from "react";
import { getFAQ } from "@reactbook/playground/mcp/server";

export function FAQDisplay() {
  const [faq, setFaq] = useState<string>("");

  useEffect(() => {
    const result = getFAQ();
    if (result.success && result.data) setFaq(result.data);
  }, []);

  return <pre>{faq}</pre>;
}
```

---

## Folder Structure

```
src/mcp/server/
├── index.ts        # Core server logic & exports
└── README.md       # This documentation
```

---

## Extending the Server

1. Add a new tool function in `index.ts`:
   ```ts
   export function newTool(param: string): McpResult {
     try {
       return { success: true, data: "Tool result" };
     } catch (err) {
       return {
         success: false,
         error: err instanceof Error ? err.message : "Unknown error",
       };
     }
   }
   ```
2. Register it in `mcpFunctions`.
3. Export it from `index.ts`.

---

## Best Practices

- Always return `McpResult`
- Handle errors with `try/catch`
- Keep functions focused
- Use TypeScript types
- Document new tools

---

## Future Enhancements

- Dynamic FAQ loading
- User feedback integration
- Smarter search
- Caching & analytics
