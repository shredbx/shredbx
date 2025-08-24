# MCP Server for @playground

## What & Why

The MCP Server provides server-side functionality for the Model Context Protocol (MCP). It's designed to be lightweight and focused on providing specific tools and resources for the playground environment.

## Features

- **FAQ System** - Predefined questions and answers about ReactBook
- **Simple API** - Easy-to-use function interface
- **Type Safe** - Full TypeScript support
- **Extensible** - Easy to add new tools and functionality

## Current Tools

### getFAQ()

Returns all available FAQ entries in a structured format.

**Returns:**

```ts
{
  success: boolean;
  data?: string;
  error?: string;
}
```

**Example:**

```ts
import { getFAQ } from "@playground/mcp/server";

const result = getFAQ();
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

### getFAQText(question: string)

Searches for a specific FAQ entry by question text.

**Parameters:**

- `question`: The question text to search for

**Returns:**

```ts
string | undefined;
```

**Example:**

````ts
import { getFAQText } from "@playground/mcp/server";

const answer = getFAQText("Story of reactbook?");
if (answer) {
  console.log(answer);
}

## FAQ Content

The server currently provides answers to these questions:

1. **Story of reactbook?** - Information about the project's creator and purpose
2. **How do I use it?** - Usage instructions for the FAQ system
3. **Where I get more info?** - Links to additional resources
4. **What related projects it has?** - List of related projects in the ecosystem

## Integration

### With MCP Client

```ts
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("my-app");
await client.connect({ type: "http", url: "http://localhost:3000/mcp" });

const result = await client.callTool({
  name: "getFAQ",
  arguments: {},
});
````

### With Next.js API Route

```ts
// pages/api/faq.ts
import { getFAQ } from "@playground/mcp/server";

export default function handler(req, res) {
  const result = getFAQ();

  if (result.success) {
    res.json({ data: result.data });
  } else {
    res.status(500).json({ error: result.error });
  }
}
```

### With React Component

```tsx
import { useEffect, useState } from "react";
import { getFAQ } from "@playground/mcp/server";

export function FAQDisplay() {
  const [faqData, setFaqData] = useState<string>("");

  useEffect(() => {
    const result = getFAQ();
    if (result.success && result.data) {
      setFaqData(result.data);
    }
  }, []);

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <pre>{faqData}</pre>
    </div>
  );
}
```

## Architecture

The MCP server is designed with a simple, function-based architecture:

```
src/mcp-server/
├── index.ts          # Main exports
├── server/           # Server implementation
│   └── index.ts      # Core server logic
└── README.md         # This documentation
```

### Core Functions

- **getFAQ()** - Returns all FAQ entries
- **getFAQText(question)** - Searches for specific FAQ
- **mcpFunctions** - Registry of all available functions

### Data Structure

```ts
interface FAQEntry {
  question: string;
  answer: string;
}

interface McpResult {
  success: boolean;
  data?: any;
  error?: string;
}
```

## Extending the Server

### Adding New Tools

1. **Create the function:**

```ts
// server/index.ts
export function newTool(param: string): McpResult {
  try {
    // Tool logic here
    return {
      success: true,
      data: "Tool result",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

2. **Add to registry:**

```ts
export const mcpFunctions = {
  getFAQ,
  newTool, // Add new tool here
};
```

3. **Export from index:**

```ts
// index.ts
export { newTool } from "./server";
```

### Adding New FAQ Entries

```ts
// server/index.ts
const FAQ_TEXT = [
  // ... existing entries
  {
    question: "New question?",
    answer: "New answer here.",
  },
];
```

## Best Practices

1. **Always return McpResult** - Use the consistent result format
2. **Handle errors gracefully** - Wrap operations in try-catch
3. **Keep functions focused** - Each function should do one thing well
4. **Use TypeScript** - Leverage type safety for better reliability
5. **Document your tools** - Add clear descriptions and examples

## Testing

### Unit Testing

```ts
import { getFAQ, getFAQText } from "@playground/mcp/server";

describe("MCP Server", () => {
  test("getFAQ returns success result", () => {
    const result = getFAQ();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test("getFAQText finds existing question", () => {
    const answer = getFAQText("Story of reactbook?");
    expect(answer).toBeDefined();
  });
});
```

### Integration Testing

```ts
import { createPlaygroundClient } from "@playground/mcp-client";

test("client can call server tools", async () => {
  const client = createPlaygroundClient("test");
  await client.connect({ type: "http", url: "http://localhost:3000/mcp" });

  const result = await client.callTool({
    name: "getFAQ",
    arguments: {},
  });

  expect(result.content).toBeDefined();
  await client.disconnect();
});
```

## Future Enhancements

- **Dynamic FAQ loading** - Load FAQ content from external sources
- **User feedback** - Allow users to suggest new questions
- **Search functionality** - More sophisticated question matching
- **Caching** - Cache frequently accessed FAQ entries
- **Analytics** - Track which questions are asked most often

## References

- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [@playground/mcp-client](./mcp-client/README.md) - Client-side functionality
- [PatternBook](../patternbook/README.md) - Pattern documentation
- [ReactBook Project](https://github.com/reactbook) - Main project repository
