import { z } from "zod";

// Types for MCP function responses
export interface McpResult {
  success: boolean;
  data?: any;
  error?: string;
}

// Simple dice rolling function
export function rollDice(sides: number): McpResult {
  try {
    const sidesSchema = z.number().int().min(2).max(100);
    const validatedSides = sidesSchema.parse(sides);

    const value = 1 + Math.floor(Math.random() * validatedSides);

    return {
      success: true,
      data: {
        result: value,
        sides: validatedSides,
        message: `Rolled ${value} on ${validatedSides}-sided die`,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid input",
    };
  }
}

// Simple random string generator
export function generateRandomString(
  length: number,
  includeNumbers = true,
  includeSymbols = false
): McpResult {
  try {
    const lengthSchema = z.number().int().min(1).max(100);
    const validatedLength = lengthSchema.parse(length);

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";
    for (let i = 0; i < validatedLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return {
      success: true,
      data: {
        result,
        length: validatedLength,
        includeNumbers,
        includeSymbols,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid input",
    };
  }
}

// Simple timestamp function
export function getTimestamp(
  format: "iso" | "unix" | "readable" = "iso"
): McpResult {
  try {
    const formatSchema = z.enum(["iso", "unix", "readable"]);
    const validatedFormat = formatSchema.parse(format);

    const now = new Date();
    let timestamp: string | number;

    switch (validatedFormat) {
      case "unix":
        timestamp = Math.floor(now.getTime() / 1000);
        break;
      case "readable":
        timestamp = now.toLocaleString();
        break;
      default:
        timestamp = now.toISOString();
    }

    return {
      success: true,
      data: {
        timestamp,
        format: validatedFormat,
        raw: now.getTime(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid format",
    };
  }
}

// Server info function
export function getServerInfo(): McpResult {
  return {
    success: true,
    data: {
      name: "shredbx-mcp-server",
      version: "0.1.0",
      functions: [
        "rollDice",
        "generateRandomString",
        "getTimestamp",
        "getServerInfo",
      ],
      uptime: process.uptime(),
      nodeVersion: process.version,
      platform: process.platform,
    },
  };
}

// Export all functions as a registry for easy integration
export const mcpFunctions = {
  rollDice,
  generateRandomString,
  getTimestamp,
  getServerInfo,
};

// Default export
export default mcpFunctions;
