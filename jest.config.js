module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{ts,tsx}",
  ],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@reactbook/ui-web/(.*)$": "<rootDir>/src/packages/ui-web/src",
    "^@patternbook/(.*)$": "<rootDir>/src/packages/patternbook-$1/src",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
