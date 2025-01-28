// backend/jest.config.js
// can do cjs as well, commonjs
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
