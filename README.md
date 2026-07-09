# MERGE - Connecting Homes, People & Trusted Services

MERGE is a next-generation, enterprise-grade Property Management & Maintenance Marketplace platform built for modern communities. By digitalizing the post-occupancy phase of residential property lifecycles, MERGE bridges the gap between residents, property managers, landlords, and verified local technicians, introducing an on-demand, secure, and AI-powered service ecosystem.

---

## 🌟 Strategic Pillars

1. **Digital Building Communities:** Every apartment building is modeled as its own private digital environment with its dashboard, localized notices, resident directories, and community boards.
2. **On-Demand Maintenance Marketplace:** A streamlined, geolocated matching system pairing residents needing repairs with nearby certified, background-checked technicians (plumbers, electricians, carpenters, painters, etc.).
3. **Trust & Verification Infrastructure:** Strict role-based verification workflows. Technicians must upload national IDs, business registrations, and certifications for platform admin approval before appearing in search queries.
4. **Technician Collaboration Network:** A first-of-its-kind peer collaboration module. When a job requires multi-disciplinary skills, a technician can invite other specialists directly into the job context with pre-negotiated, contract-enforced, and system-automated revenue splits.
5. **Vacancy & Rental Marketplace:** Landlords can advertise units, and prospective tenants can schedule viewings, submit digital applications, and manage leases.
6. **Unified Payment & Wallet Infrastructure:** Multiple secure wallets (resident, technician, building maintenance fund, and platform commission ledger) integrated with M-Pesa (Daraja API) and Stripe for instant billing, escrow, and splitting.
7. **AI-Driven Operations:** Built-in AI assistants for self-diagnosis of issues, image issue recognition, predictive building maintenance alerts, smart price estimation, and natural language searching.

---

## 🛠️ The Tech Stack

- **Frontend:** Next.js 15 (App Router, Server Components), React 19, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, TanStack Query, React Hook Form, Zod.
- **Backend:** NestJS, TypeScript, REST API, WebSockets.
- **Database & State:** PostgreSQL (with `pgvector` for AI-RAG embedding storage), Prisma ORM, Redis (caching and pub/sub).
- **Authentication:** Clerk or Better Auth (Secure Session management, multi-tenant RBAC, JWT rotation).
- **Storage:** Supabase Storage (Secure bucket segregation for verification docs, work images, and profile media).
- **Realtime:** Supabase Realtime (WebSockets for chat, job state updates, and tracking).
- **Payments:** M-Pesa Daraja API (STK Push, B2C, C2B), Stripe.
- **Third-Party APIs:** Resend (Transactional emails), Africa's Talking (Transactional SMS), Firebase Cloud Messaging (FCM Push Notifications), Google Maps/Mapbox (Geolocation routing).
- **AI Core:** Gemini 1.5 Pro API & OpenAI GPT-4o, LangChain, vector storage.
- **DevOps & Monitoring:** Docker, Docker Compose, GitHub Actions, Vercel, Railway, Supabase, Sentry, OpenTelemetry.
- **Testing:** Vitest, Playwright, Jest, Supertest.

---

## 🚀 Development Phases

We execute our engineering lifecycle in 11 sequential phases:

*   **Phase 0:** Project Planning & Architecture (Current)
*   **Phase 1:** Authentication, Authorization & RBAC
*   **Phase 2:** Apartment & Community Profile Management
*   **Phase 3:** Technician Onboarding, Verification & Profiles
*   **Phase 4:** Smart Maintenance Requests & Job Lifecycle
*   **Phase 5:** Realtime Messaging, Chat & Global Notifications
*   **Phase 6:** Multi-Wallet Architecture & Multi-Gateway Payments
*   **Phase 7:** Vacancy Marketplace & Rental Application Processing
*   **Phase 8:** Unified Reviews, Ratings, and Platform Analytics
*   **Phase 9:** Intelligent AI Maintenance Assistant & RAG Knowledge Base
*   **Phase 10:** Performance Optimizations, Comprehensive Auditing & CI/CD Deployment

---

## 📂 Repository Structure

The MERGE platform is orchestrated as a high-performance npm Workspaces Monorepo to easily share schemas, validation Zod types, and interfaces across the stack:

*   `apps/backend`: NestJS application
*   `apps/frontend`: Next.js 15 application
*   `packages/database`: Prisma schema, migrations, and seed scripts
*   `packages/shared-types`: Shared Zod validation schemas, API contract interfaces, and shared types

---

For architectural details, coding conventions, and developer contribution guidelines, refer to the [GEMINI.md](./GEMINI.md) file.
