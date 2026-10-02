# ÉLAN Beauty Studio Website

A responsive, single-page beauty salon website and reusable client template for ÉLAN Beauty Studio.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/elan-beauty-studio run dev` — run the salon website
- `pnpm --filter @workspace/elan-beauty-studio run typecheck` — typecheck the website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- The salon website is frontend-only; its enquiry form validates and displays a local confirmation but does not send or store submissions.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/elan-beauty-studio/src/data/studio.ts` — client name, tagline, colors, contact details, links, opening hours, services, prices, testimonials, and image paths
- `artifacts/elan-beauty-studio/src/components/` — navigation, page sections, gallery/lightbox, and interactive components
- `artifacts/elan-beauty-studio/public/images/` — generated sample salon and beauty photography; replace these files or update their paths in `studio.ts`
- `artifacts/elan-beauty-studio/src/index.css` — responsive layout, theme tokens, animation, and accessibility styles

## Architecture decisions

- Keep client-specific content and data centralized in `src/data/studio.ts` for quick freelance reuse.
- Keep the enquiry form local-only until a salon chooses its booking or CRM service.

## Product

- Single-page salon showcase with service filters, bridal packages, before/after slider, filtered gallery and keyboard-accessible lightbox.
- Appointment request form with browser validation and a clear local-only confirmation.
- Responsive navigation, testimonial carousel, contact and social links, and reduced-motion support.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
