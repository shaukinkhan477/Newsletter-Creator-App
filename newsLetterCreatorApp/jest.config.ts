module.exports = {
  preset: 'jest-preset-angular',
  // Use jsdom test environment so we have a DOM
  testEnvironment: 'jsdom',
  // For Angular v17 (standalone), you might need the following:
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-jest.ts'],
  // Transform TS files via ts-jest
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest',
  },
  // If your Angular is in `src/`, tell Jest about it
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html', 'json'],
  // Make sure you ignore transforms on node_modules except for your library usage
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)', // do not ignore .mjs
  ],
  // By default, Jest searches for `*.spec.ts|tsx|js|jsx` in `__tests__` or similar
  // adapt "testMatch" if needed
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.test.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
};
