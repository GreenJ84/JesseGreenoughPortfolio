module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    },
    coverageReporters: [
        'lcov',
        'text',
        'html',
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '<rootDir>/src/**/*.tsx',
        '!<rootDir>/src/**/*.test.(ts|tsx)',
        '!<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
        '!<rootDir>/src/**/index.(ts|tsx)',
        '!<rootDir>/src/**/App.(ts|tsx)',
    ],
    coverageThreshold: {
        global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
        },
    },
};

export { };