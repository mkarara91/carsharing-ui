module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    coverageDirectory: 'coverage',
    setupFiles: ['./enzyme.config.js'],
    preset: 'ts-jest',
    // A map from regular expressions to paths to transformers
    transform: {
      "^.+\\.scss$": 'jest-scss-transform',
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
};