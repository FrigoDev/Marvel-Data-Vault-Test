// eslint-disable-next-line no-undef
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
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  }
};