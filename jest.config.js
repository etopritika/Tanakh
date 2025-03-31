/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.app.json",
      },
    ],
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  clearMocks: true,
};
