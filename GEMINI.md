# MERGE Engineering & Architecture Standards

This document establishes the foundational mandates, architectural standards, coding conventions, and developer workflows for the MERGE platform. All developers (including AI agents) must strictly adhere to these guidelines.

---

## 1. Architectural Philosophy

MERGE is designed as an enterprise-grade, high-performance property management and maintenance ecosystem. To ensure scalability, testability, and long-term maintainability, the project adopts:
- **Clean Architecture & Domain-Driven Design (DDD):** Explicit decoupling of Domain, Application, and Infrastructure layers.
- **Feature-Based Monorepo Directory Structure:** Grouping of files by technical responsibility inside unified workspaces, with distinct directories for shared contracts, frontend (Next.js 15), and backend (NestJS).
- **Hexagonal Architecture (Ports & Adapters):** Isolating the business core from external integrations (M-Pesa, Stripe, Africa's Talking, OpenAI, etc.).
- **CQRS (Command Query Responsibility Segregation):** Used in complex services like Payments, Wallets, and Maintenance Jobs to decouple write actions from analytics queries.

---

## 2. Directory Layout (npm Workspaces Monorepo)

```text
C:\Users\Tonnie\merge\
├── apps/
│   ├── backend/                # NestJS Core API (Backend)
│   │   ├── src/
│   │   │   ├── common/         # NestJS Interceptors, Filters, Guards, Decorators
│   │   │   ├── config/         # App configuration schema (Zod validated)
│   │   │   ├── database/       # Prisma Module and Client definitions
│   │   │   └── modules/        # Domain features (auth, apartments, maintenance, payments, AI)
│   │   └── test/               # E2E and Integration test suites
│   │
│   └── frontend/               # Next.js 15 App Router (Frontend)
│       ├── src/
│       │   ├── app/            # App router paths (pages, layouts, loading, error handlers)
│       │   ├── components/     # UI components (ShadCN, Framer Motion)
│       │   ├── hooks/          # React Custom Hooks (TanStack Query, UI state)
│       │   ├── lib/            # Third-party configurations (Clerk, Supabase, Mapbox)
│       │   ├── services/       # API integration layer / Fetch clients
│       │   └── types/          # Frontend-specific UI types
│       └── tailwind.config.ts  # Theme configuration (Premium custom theme)
│
├── packages/
│   ├── database/               # Prisma schema and migrations
│   └── shared-types/           # Shared API contracts, validation schemas (Zod), and TypeScript types
│
├── docker-compose.yml          # Infrastructure setup (Postgres, Redis, PgVector)
├── package.json                # Root package configuration defining workspaces
└── turbo.json                  # Turborepo build cache config
```

---

## 3. General Coding Standards & Style

### 3.1. General Rules
- **Explicit Typings:** Always prefer explicit typings. Do *not* bypass the TypeScript compiler using `any`, `unknown` casts (unless sanitizing input), or `ts-ignore`.
- **Composition over Inheritance:** Prioritize composition and delegation (e.g., repository patterns, helper services) over deep class inheritance hierarchies.
- **Immutability:** Use `readonly` fields and immutable data structures where applicable, especially in domain aggregates and configuration configurations.
- **No Hacks:** Never suppress linter warnings or TypeScript compiler checks using escape hatches. Write robust type-guards instead.

### 3.2. Naming Conventions
- **Files & Folders:** Use `kebab-case` for all folders and files (e.g., `maintenance-request.service.ts`, `user-card.tsx`).
- **Classes, Interfaces, Types:** Use `PascalCase` (e.g., `UserRepository`, `CreateUserDto`). Avoid suffixing interfaces with `I` (e.g., write `UserService` instead of `IUserService`, except when writing explicit Ports/Contracts).
- **Variables & Functions:** Use `camelCase` (e.g., `getUserById`, `isVerifiedTechnician`).
- **Database Tables & Columns:** Use `snake_case` (e.g., `maintenance_requests`, `user_id`).
- **Constants & Enums:** Use `UPPER_SNAKE_CASE` (e.g., `MAX_PAYMENT_LIMIT`, `UserRole.PROPERTY_MANAGER`).

---

## 4. Specific Backend Mandates (NestJS)

- **Dependency Injection:** Use NestJS native DI container. Never manually instantiate singleton services inside controllers or resolvers.
- **Repository Pattern:** Abstract all database interactions behind Repository classes. The domain modules must depend on repositories rather than direct Prisma Client calls.
- **Dints & Pipes (Validation):** Use `class-validator` and `zod-nestjs` for strict request payload validation. Every Controller endpoint must have structured DTOs.
- **Global Exception Filter:** All HTTP and Websocket exceptions must route through a unified Exception Filter to prevent raw stack traces from reaching clients.
- **Secured-by-Default (RBAC):** All endpoints must be secured by default using JWT Authentication and Role-Based Access Control (RBAC) guards. Public endpoints must be explicitly decorated with `@Public()`.
- **Audit Logs:** Mutating actions (Create, Update, Delete) must trigger Audit Log operations asynchronously to prevent overhead on user execution times.

---

## 5. Specific Frontend Mandates (Next.js 15 & React 19)

- **React Server Components (RSC):** Utilize Server Components by default for static/dynamic page loads and fetching initial data. Use Client Components (`"use client"`) only when there is state, interactive logic, or event listeners.
- **Data Fetching:** Standardize on **TanStack Query (React Query)** for client-side state, caching, mutations, and pagination.
- **Forms and Validation:** Couple **React Hook Form** with **Zod** schema validations for all inputs.
- **UI & Animations:** Build with **ShadCN UI** (fully styled with Tailwind CSS) and orchestrate micro-interactions using **Framer Motion**.
- **Responsive & Accessible (a11y):** All UI elements must strictly comply with WCAG 2.1 AA standards, supporting keyboard navigation and screen readers.
- **State Management:** Use localized state or **Zustand** for lightweight global UI states (e.g., theme toggle, active notifications drawer).

---

## 6. Database & Persistence Standards

- **PostgreSQL & Prisma:** Utilize Prisma ORM for type-safe database queries.
- **UUIDs:** Always use UUID v4 (or secure, index-optimized ULIDs) for primary keys. Never use auto-incrementing integers in public-facing database records.
- **Soft Deletes:** Implement standard soft-deleting columns (`deletedAt: DateTime?`) and filter queries appropriately.
- **Indexes:** Create single-column or composite indexes on fields frequently used in filters, orderings, and joins (e.g., `user_id`, `apartment_id`, `status`).
- **Audit Fields:** Every model must contain `createdAt: DateTime`, `updatedAt: DateTime`, and optional `deletedAt: DateTime`.

---

## 7. Quality Assurance & Testing Guidelines

- **Unit Testing:** Write isolated unit tests using **Vitest** for frontend, and **Jest** for backend components.
- **Integration Testing:** Write comprehensive service-level integration tests utilizing test databases or Prisma transactions to verify module workflows.
- **E2E Testing:** Write E2E user flows using **Playwright** (for user journeys) and **Supertest** (for REST API coverage).
- **Commit Gates:** No code will be merged without passing lint checks, TypeScript checks, and 100% core business path test coverage.
