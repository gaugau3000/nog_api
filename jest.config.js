module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/test/**/*.test.(ts|js)'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom : [
    "<rootDir>/src/**/*.ts",
  ]
}
