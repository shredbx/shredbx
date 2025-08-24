// Example usage of the new MCP server and client structure
// This demonstrates how to use each module separately

// Example 1: Using MCP Server (Next.js only)
export function serverExample() {
  // This would be used in a Next.js API route or server-side code
  // import { getFAQ, getFAQText } from '@playground/mcp/server';

  console.log("MCP Server Example:");
  console.log("Use @playground/mcp/server for server-side functionality");
  console.log("Available functions: getFAQ(), getFAQText(question)");
}

// Example 2: Using MCP Client (Web + React Native)
export async function clientExample() {
  // This would be used in any client environment
  // import { createPlaygroundClient } from '@playground/mcp-client';

  console.log("MCP Client Example:");
  console.log(
    "Use @playground/mcp-client for cross-platform client functionality"
  );
  console.log(
    "Available functions: createPlaygroundClient(), createMcpClient()"
  );
}

// Example 3: Using Main Playground (UI components)
export function playgroundExample() {
  // This would be used for UI experiments and demos
  // import { patternplayGreeting, Button } from '@playground';

  console.log("Main Playground Example:");
  console.log("Use @playground for UI components and experiments");
  console.log(
    "Available: patternplayGreeting, Button, and other UI components"
  );
}

// Example 4: Complete MCP Workflow
export async function completeWorkflowExample() {
  console.log("Complete MCP Workflow:");
  console.log("1. Server: @playground/mcp/server provides FAQ tools");
  console.log("2. Client: @playground/mcp-client connects to any MCP server");
  console.log("3. Main: @playground provides UI components for experiments");
  console.log(
    "4. Result: Cross-platform MCP integration without breaking existing clients"
  );
}

// Export all examples
export const examples = {
  server: serverExample,
  client: clientExample,
  playground: playgroundExample,
  complete: completeWorkflowExample,
};
