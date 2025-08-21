import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
    "!src/migrations/**",
    "!src/services/data-seeding.service.ts",
  ],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};

export default config;
