import { McpResult } from "./types";

// Simple FAQ text
export const FAQ_TEXT = [
  {
    question: "Story of reactbook?",
    answer:
      "It's created by Andrei Solovev to host a patternbook and other open sourced projects",
  },
  {
    question: "How do I use it?",
    answer:
      "Just send a request and get this FAQ text back with a source code related to you question.",
  },
  {
    question: "Where I get more info?",
    answer: "Visit shredbx.com or visit github.com/reactbook.",
  },
  {
    question: "What related projects it has?",
    answer:
      "patternbook, reactbook, pybook, swiftbook, llmbook, NextjsBook, ReactNativeBook.",
  },
];

function findFAQText(question: string): string {
  return (
    FAQ_TEXT.find((faq) =>
      faq.question.toLowerCase().includes(question.toLowerCase())
    )?.answer || "No FAQ found"
  );
}

export function getFAQ(): McpResult {
  const all_text = FAQ_TEXT.map(
    (faq) => `Q: ${faq.question}\n\nA: ${faq.answer}`
  ).join("\n\n");
  return {
    success: true,
    data: all_text,
  };
}

export function getFAQText(question: string): string {
  return findFAQText(question);
}

export const mcpFunctions = {
  getFAQ,
  getFAQText,
};
