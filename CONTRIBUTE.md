# Contribution Guide

To maintain a smooth and efficient development process, please follow these guidelines.

### Tech Stack

- **Tools**: Use **Bun** as the package manager, **Tailwind CSS** for styling, and **Framer Motion** for animations.

### UI & State Focus

- **Development**: Focus strictly on the **UI and state management** part. You don't need to fully connect to the backend yet.

### DTOs & Class Diagrams

- **Standards**: Data Transfer Objects (DTOs) will be provided via class diagrams. Your client-side object should match these DTOs.

### Development Principles

- **Feature-by-Feature**: Focus on one feature at a time. This keeps our PRs manageable and easy to review.
- **Scope Control**: Try your best **not to edit files outside the scope** of the feature you are working on. Avoid unnecessary changes to global styles, configurations, or other features.
- **All-in-One Directory** *(Important)*: For now, keep all files related to your feature (components, hooks, types, etc.) in the **same directory**. Do not split them into separate folders like `components/` or `lib/`. A manager will handle the refactoring and organization after the PR is merged.

### Design System

We have a predefined color palette in `src/app/globals.css`. Please use these Tailwind color variables to maintain consistency:

- **Primary Colors**: `oonjai-green`, `oonjai-sec-green`, `oonjai-blue`, `oonjai-yellow`, `oonjai-red`, `oonjai-orange`, `oonjai-cream`.
- **Usage Example**: `bg-oonjai-green-500`, `text-oonjai-blue-400`, `border-oonjai-cream-300`.
- **Avoid Hardcoding**: Do not use hex codes or other colors unless absolutely necessary. Stick to the provided theme variables.

### Workflow

1.  **No Direct Commits**: Never commit directly to the `main` or `develop` branch.
2.  **Open a Pull Request (PR)**: Always create a new branch for your feature and open a PR for review.
3.  **Review & Refactor**: Once your PR is submitted, I will review the code and perform any necessary refactoring to ensure every feature works with each other.

### Commit Standards

We use **Husky** and **Commitlint** to ensure high code quality. Please follow the Conventional Commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks

Happy coding! 🌿