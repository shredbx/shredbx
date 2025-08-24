// Simple FAQ text
const FAQ_TEXT = [
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

export interface McpResult {
  success: boolean;
  data?: any;
  error?: string;
}

function getFAQText(question: string): string {
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

  // return {
  //   success: true,
  //   data: getFAQText(),
  // };
}

export const mcpFunctions = {
  getFAQ,
};
