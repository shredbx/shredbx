import { mcpFunctions } from "@shredbx/mcp-server";
import { createMcpHandler } from "@vercel/mcp-adapter";

const handler = createMcpHandler(
  (server) => {
    server.tool("getFAQ", "Get FAQ information", {}, async ({}) => {
      const result = mcpFunctions.getFAQ(); // Handle empty question
      return {
        content: [{ type: "text", text: result.data }],
      };
    });
  },
  {
    capabilities: {
      tools: {
        getFAQ: {
          description: "Get FAQ information",
          parameters: {
            question: {
              type: "string",
              description: "The question to get FAQ information for",
            },
          },
        },
      },
    },
    // Optional server options
  },
  {
    redisUrl: process.env.REDIS_URL,
    basePath: "/mcp",
    maxDuration: 60,
    verboseLogs: true,
  }
);

export { handler as GET, handler as POST };
