module.exports = {
  testEnvironment : "jsdom",
  setupFilesAfterEnv : [
    "<rootDir>/jest-setup.ts"
  ],
  moduleNameMapper : {
    "\\.(css|less|scss|sass)$" : "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif)$": "jest-transform-stub"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  }
};