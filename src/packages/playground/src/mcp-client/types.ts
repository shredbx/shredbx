// Platform-agnostic MCP client types
// Compatible with both web and React Native environments

export interface McpClientConfig {
  name: string;
  version: string;
  transport: "http" | "stdio" | "sse";
  endpoint?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface McpClientInfo {
  name: string;
  version: string;
  capabilities?: string[];
}

export interface McpConnectionOptions {
  type: "http" | "stdio" | "sse";
  url?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface McpToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface McpToolResult {
  content: Array<{
    type: "text" | "image" | "code";
    text?: string;
    image?: string;
    code?: string;
    language?: string;
  }>;
  isError?: boolean;
}

export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface McpPrompt {
  name: string;
  description?: string;
  arguments?: Record<string, unknown>;
}

export interface McpClient {
  info: McpClientInfo;
  connect(options: McpConnectionOptions): Promise<void>;
  disconnect(): Promise<void>;
  callTool(tool: McpToolCall): Promise<McpToolResult>;
  listTools(): Promise<string[]>;
  getResource(uri: string): Promise<McpResource>;
  listResources(): Promise<McpResource[]>;
  getPrompt(name: string): Promise<McpPrompt>;
  listPrompts(): Promise<McpPrompt[]>;
  ping(): Promise<boolean>;
}
