import { patternplayGreeting, Button } from "@reactbook/playground";

export function PlaygroundTest() {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">PatternPlay Test</h2>
      <p className="text-gray-600 mb-3">{patternplayGreeting}</p>
      <Button variant="outline">Test Button from PatternPlay</Button>
    </div>
  );
}
