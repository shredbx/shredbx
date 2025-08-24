// Platform-agnostic MCP client implementation
// Compatible with both web and React Native environments

import type {
  McpClient,
  McpClientConfig,
  McpConnectionOptions,
  McpToolCall,
  McpToolResult,
  McpResource,
  McpPrompt,
} from "./types";

export class PlaygroundMcpClient implements McpClient {
  public info: McpClientConfig;
  private connected = false;
  private sessionId?: string;

  constructor(config: McpClientConfig) {
    this.info = config;
  }

  async connect(options: McpConnectionOptions): Promise<void> {
    try {
      // Platform-agnostic connection logic
      switch (options.type) {
        case "http":
          if (!options.url) {
            throw new Error("URL required for HTTP transport");
          }
          // HTTP connection logic would go here
          break;

        case "stdio":
          if (!options.command) {
            throw new Error("Command required for stdio transport");
          }
          // stdio connection logic would go here
          break;

        case "sse":
          if (!options.url) {
            throw new Error("URL required for SSE transport");
          }
          // SSE connection logic would go here
          break;

        default:
          throw new Error(`Unsupported transport type: ${options.type}`);
      }

      this.connected = true;
      this.sessionId = this.generateSessionId();
    } catch (error) {
      throw new Error(
        `Failed to connect: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.sessionId = undefined;
  }

  async callTool(tool: McpToolCall): Promise<McpToolResult> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    try {
      // Platform-agnostic tool calling logic
      // This would integrate with the actual MCP server
      return {
        content: [
          {
            type: "text",
            text: `Tool ${tool.name} called with arguments: ${JSON.stringify(tool.arguments)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error calling tool ${tool.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
        isError: true,
      };
    }
  }

  async listTools(): Promise<string[]> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    // Return available tools from the playground MCP server
    return ["getFAQ", "ping", "getServerInfo"];
  }

  async getResource(uri: string): Promise<McpResource> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    // Platform-agnostic resource retrieval
    return {
      uri,
      name: uri.split("/").pop() || "unknown",
      mimeType: "text/plain",
    };
  }

  async listResources(): Promise<McpResource[]> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    // Return available resources
    return [];
  }

  async getPrompt(name: string): Promise<McpPrompt> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    // Return prompt information
    return {
      name,
      description: `Prompt: ${name}`,
    };
  }

  async listPrompts(): Promise<McpPrompt[]> {
    if (!this.connected) {
      throw new Error("Client not connected");
    }

    // Return available prompts
    return [];
  }

  async ping(): Promise<boolean> {
    if (!this.connected) {
      return false;
    }

    try {
      // Simple ping implementation
      return true;
    } catch {
      return false;
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  isConnected(): boolean {
    return this.connected;
  }

  getSessionId(): string | undefined {
    return this.sessionId;
  }
}

// Factory function for creating MCP clients
export function createMcpClient(config: McpClientConfig): PlaygroundMcpClient {
  return new PlaygroundMcpClient(config);
}

// Convenience function for quick client creation
export function createPlaygroundClient(
  name: string,
  version: string = "1.0.0"
): PlaygroundMcpClient {
  return createMcpClient({
    name,
    version,
    transport: "http",
    endpoint: "http://localhost:3000/mcp",
  });
}
