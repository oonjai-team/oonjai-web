# Oonjai Web Copilot Instructions

## Architecture Overview
- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom color palette (oonjai-green-*, oonjai-blue-*, PrimaryCream, etc.) defined in `src/app/globals.css`
- **Animations**: Framer Motion for interactive components (e.g., `motion.div` with `whileHover`, `layout`)
- **API Layer**: Custom service classes in `src/lib/service/` - `ServiceConnector` for HTTP requests with Bearer auth, `APIResponse` for typed responses, `VersionParser` for API versioning
- **Environment**: `@t3-oss/env-nextjs` with Zod validation; client vars prefixed `NEXT_PUBLIC_`
- **Icons**: Lucide React (import from `lucide-react`)

## Key Patterns
- **Component Structure**: Server components by default; mark `"use client"` for interactivity. Place in `src/components/ui/` with subfolders like `landing/`
- **State Management**: React hooks (`useState`) for local UI state; no global state library yet
- **API Calls**: Instantiate `ServiceConnector` with `IdentityProvider`, call `.GET<T>()` or `.POST<T>()` returning `APIResponse<T>`
- **Color Usage**: Use semantic names like `bg-oonjai-green-500` for branding, `text-oonjai-blue-300` for secondary text
- **File Organization**: DTOs/schemas in same directory as components (e.g., `schema.ts` with `ExampleItemDTO`)
- **Animations**: Wrap elements in `motion.div` with `whileHover={{ scale: 1.02 }}` for micro-interactions

## Developer Workflows
- **Package Manager**: Bun (not npm/yarn) - `bun install`, `bun dev`, `bun run build`
- **Linting**: `bun lint` (ESLint with Next.js rules, strict on `@typescript-eslint/no-explicit-any`)
- **Testing**: No test script configured yet; README mentions `bun test` but implement as needed
- **Git Hooks**: Husky + lint-staged auto-fixes TypeScript/React files on commit
- **Commits**: Conventional commits enforced by commitlint (`feat:`, `fix:`, etc.)
- **Environment Setup**: Copy `env.example` to `.env`, set `NEXT_PUBLIC_SERVICE_URL` and `NEXT_PUBLIC_ALLOWED_SERVICE_VERSION`

## Examples
- **Landing Page**: `src/app/page.tsx` imports sections from `src/components/ui/landing/`
- **API Integration**: See `ServiceConnector.GET()` in `src/lib/service/ServiceConnector.ts` - builds URL with `env.SERVICE_URL`, adds Bearer token
- **Custom Component**: `src/app/example/ExampleCard.tsx` uses Framer Motion and custom colors for status badges
- **Env Validation**: `src/lib/env.ts` defines schemas for server/client vars with Zod

Focus on mobile-first responsive design, accessibility, and performance. Use existing color variables for consistency.