# MCP Client for @playground

## What & Why

The MCP Client provides a platform-agnostic interface for connecting to MCP servers. It's designed to work in both web and React Native environments, making it reusable across different platforms.

## Features

- **Platform Agnostic** - Works in web and React Native
- **Multiple Transport Support** - HTTP, stdio, and SSE
- **Type Safe** - Full TypeScript support
- **Session Management** - Automatic session ID handling
- **Error Handling** - Robust error handling and recovery

## Usage

### Basic Client Creation

```tsx
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("my-app", "1.0.0");
```

### Custom Client Configuration

```tsx
import { createMcpClient } from "@playground/mcp-client";

const client = createMcpClient({
  name: "my-app",
  version: "1.0.0",
  transport: "http",
  endpoint: "http://localhost:3000/mcp",
});
```

### Connecting to Server

```tsx
// HTTP connection
await client.connect({
  type: "http",
  url: "http://localhost:3000/mcp",
});

// stdio connection
await client.connect({
  type: "stdio",
  command: "node",
  args: ["./mcp-server.js"],
});

// SSE connection
await client.connect({
  type: "sse",
  url: "http://localhost:3000/mcp/sse",
});
```

### Calling Tools

```tsx
const result = await client.callTool({
  name: "getFAQ",
  arguments: { question: "What is ReactBook?" },
});

console.log(result.content[0].text);
```

### Listing Available Tools

```tsx
const tools = await client.listTools();
console.log("Available tools:", tools);
```

### Checking Connection Status

```tsx
if (client.isConnected()) {
  const isAlive = await client.ping();
  console.log("Server is alive:", isAlive);
}
```

### Disconnecting

```tsx
await client.disconnect();
```

## Transport Types

### HTTP

- **Use case**: Web applications, REST APIs
- **Pros**: Simple, widely supported
- **Cons**: Requires HTTP server setup

### stdio

- **Use case**: Command-line tools, local development
- **Pros**: Direct process communication
- **Cons**: Limited to local processes

### SSE (Server-Sent Events)

- **Use case**: Real-time updates, streaming
- **Pros**: Real-time, efficient
- **Cons**: One-way communication (server to client)

## Platform Compatibility

### Web (Next.js, React)

```tsx
// Works out of the box
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("web-app");
```

### React Native

```tsx
// Compatible with React Native
import { createPlaygroundClient } from "@playground/mcp-client";

const client = createPlaygroundClient("mobile-app");
```

## Error Handling

```tsx
try {
  await client.connect({ type: "http", url: "http://localhost:3000/mcp" });
} catch (error) {
  console.error("Connection failed:", error.message);
}

try {
  const result = await client.callTool({ name: "unknownTool", arguments: {} });
  if (result.isError) {
    console.error("Tool execution failed");
  }
} catch (error) {
  console.error("Tool call failed:", error.message);
}
```

## Best Practices

1. **Always check connection status** before making calls
2. **Handle errors gracefully** with try-catch blocks
3. **Disconnect properly** when done to free resources
4. **Use appropriate transport** for your use case
5. **Validate tool arguments** before calling

## Examples

### Next.js API Route

```tsx
// pages/api/mcp.ts
import { createPlaygroundClient } from "@playground/mcp-client";

export default async function handler(req, res) {
  const client = createPlaygroundClient("api-route");

  try {
    await client.connect({
      type: "http",
      url: process.env.MCP_SERVER_URL,
    });

    const result = await client.callTool({
      name: "getFAQ",
      arguments: { question: req.query.q },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.disconnect();
  }
}
```

### React Component

```tsx
import { useEffect, useState } from "react";
import { createPlaygroundClient } from "@playground/mcp-client";

export function McpTool({ toolName, arguments: args }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = createPlaygroundClient("react-component");

    async function callTool() {
      try {
        setLoading(true);
        await client.connect({ type: "http", url: "/api/mcp" });
        const toolResult = await client.callTool({
          name: toolName,
          arguments: args,
        });
        setResult(toolResult);
      } catch (error) {
        console.error("Tool call failed:", error);
      } finally {
        setLoading(false);
        await client.disconnect();
      }
    }

    callTool();
  }, [toolName, args]);

  if (loading) return <div>Loading...</div>;
  if (!result) return <div>No result</div>;

  return (
    <div>
      {result.content.map((item, index) => (
        <div key={index}>
          {item.type === "text" && <p>{item.text}</p>}
          {item.type === "code" && <pre>{item.code}</pre>}
        </div>
      ))}
    </div>
  );
}
```

## References

- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [@playground/mcp/server](./mcp/server/README.md) - Server-side functionality
- [PatternBook](../patternbook/README.md) - Pattern documentation
