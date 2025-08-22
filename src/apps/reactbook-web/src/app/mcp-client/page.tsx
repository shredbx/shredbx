// app/mcp/page.tsx
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

interface Props {
  searchParams: { prompt?: string };
}

// const origin = process.argv[2] || "https://reactbook.shredbx.com";

export default async function MCPPage({ searchParams }: Props) {
  const promptText = (await searchParams).prompt;

  if (!promptText) return <div>No prompt</div>;

  const transport = new StdioClientTransport({
    command: "node",
    args: ["server.js"],
  });

  const client = new Client({
    name: "example-client",
    version: "1.0.0",
  });

  await client.connect(transport);
  console.log("Connected", client.getServerCapabilities());
  const tools = await client.listTools();
  console.log(tools);

  const result = await client.callTool({
    name: "example-tool",
    arguments: {
      prompt: promptText,
    },
  });

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
