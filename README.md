# 🌿 Oonjai Web

A high-performance frontend repository for **Oonjai**, built with **Next.js 15** and **Bun**.

## (IMPORTANT!) For Contributors
Please visit [Contributor Guide](/CONTRIBUTE.md)

---

## 🚀 Getting Started

### 📦 Prerequisites

This project requires **[Bun](https://bun.sh/)** for package management and as the runtime.

#### 1. Install Bun (macOS / Linux)

```bash
curl -fsSL https://bun.sh/install | bash
```

#### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd oonjai-web
```

---

## ⚡ Quick Setup

Run these commands to prepare your local environment:

```bash
# 1. Install dependencies (automatically sets up git hooks)
bun install

# 2. Configure environment variables
cp .env.example .env

# 3. Verify foundation logic
bun lint
bun test
```

> ⚠️ Make sure to update the values in your `.env` file with the correct service URLs and API versions before starting development.

---

## 🛠 Development Workflow

Start the local development server:

```bash
bun dev
```

---

## 🔒 Enforcement Layer

This project uses **Husky** to maintain high code quality.

The following checks run automatically on every commit:

- **Linting** — Ensures code follows the shared style guide  
- **Testing** — Runs `src/lib/api.test.ts` to prevent logic regressions  
- **Commitlint** — Validates commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`)

---

## 📁 Project Structure

```
src/
├── app/         # Next.js App Router (Pages & Layouts)
├── components/  # Reusable UI components (Buttons, Inputs, etc.)
├── features/    # Domain-specific logic and UI (Auth, User, etc.)
└── lib/         # Core services, ServiceConnector, shared utilities
```

---

Happy coding 🌿
