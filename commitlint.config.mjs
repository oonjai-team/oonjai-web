export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",     // New features
        "fix",      // Bug fixes
        "chore",    // Maintenance/scaffolding
        "docs",     // Documentation
        "style",    // Formatting/CSS
        "refactor", // Code restructuring
        "test",     // Adding tests
        "revert",   // Reverting commits
      ],
    ],
  },
};