# CLAUDE.md

> **Note:** This is the main instruction file for AI assistants. Referenced by `.claude/instructions.md`.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PatrikSUI is a React component library monorepo built with Bun workspaces. It follows shadcn/ui patterns using Tailwind CSS, class-variance-authority (CVA), and CSS custom properties for theming.

## Commands

```bash
# Development (builds deps first, then runs all packages in watch mode)
bun run dev

# Build (order matters: types → core → playground)
bun run build

# Lint and format
bun run lint
bun run format
```

## Architecture

### Package Structure

- **@patriksui-types** (`@patriksui/types`) - TypeScript type definitions for all components. Built with plain `tsc`. No runtime code, just `.d.ts` exports.

- **@patriksui-core** (`@patriksui/core`) - Component implementations using React + Tailwind. Built with Rslib (Rsbuild for libraries). Exports ESM, CJS, and bundled CSS.

- **@patriksui-playground** (`playground`) - Development/demo app using Rsbuild. Consumes the component library.

### Build Order Dependency

The build must run in sequence: `types` → `core` → `playground`. The root `build` script handles this ordering.

### Component Pattern

Components use CVA for variant management:
1. Types defined in `@patriksui-types/src/components.ts`
2. Implementation in `@patriksui-core/src/components/ui/`
3. Use `cn()` utility (clsx + tailwind-merge) for className composition
4. Path alias `@/` maps to `./src/` in the core package

### Styling

- CSS variables defined in `@patriksui-core/src/styles/globals.css`
- Tailwind configured with semantic color tokens (primary, secondary, destructive, etc.)
- Dark mode via `.dark` class on root element
- Consumers import styles via `@patriksui/core/styles.css`

## Code Style

- Biome for linting/formatting (single quotes, trailing commas, 2-space indent, 100 char line width)
- TypeScript strict mode enabled
- React components use `forwardRef` pattern
