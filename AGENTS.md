# Project Agent Guide

## Project overview

This repository is a Chinese vocabulary learning app with a React frontend and an Express API. The frontend is currently mostly a static prototype: pages use mock data and `localStorage`; do not assume a page is connected to the backend unless its code proves it.

## Stack and layout

- `frontend/`: React 18, TypeScript, Vite, React Router, and Tailwind CSS.
- `backend/`: Node.js, Express, TypeScript, Prisma, Zod, and JWT authentication.
- Database: MySQL 8. Prisma's datasource is `mysql`; backend startup validates that `DATABASE_URL` begins with `mysql://`.
- `docs/`: setup, architecture, API, database, and frontend/backend mapping.
- Backend request flow: routes → controllers → validators/services → Prisma. Keep business rules in services and use the existing error/response helpers.

## Important domain behavior

- Practice sessions are created and answered through the `/api/practice` routes. Session completion updates study and gamification data.
- Spaced repetition is implemented in `backend/src/services/srs.service.ts`; review history is stored in `srs_reviews`, while `user_vocabularies.next_review_at` supports due-item queries.
- Mixing and exercise generation live in `mixing.service.ts` and `exercise.service.ts`. The exercise catalog may list more exercise types than the generator currently supports; check implementation before extending the UI or promising support.
- The frontend route map is in `frontend/src/App.tsx`. Shared layout and navigation live in `frontend/src/layouts/`.
- `docs/frontend-backend-mapping.md` describes current integration gaps. Treat source code and Prisma schema as authoritative if documentation disagrees.

## Development commands

Run commands from the relevant package directory.

Backend:

```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Frontend:

```bash
npm install
npm run dev
```

Backend checks/builds: `npm run typecheck` and `npm run build`. Frontend production build: `npm run build`.

Set `DATABASE_URL`, `JWT_SECRET`, and optionally `PORT` in `backend/.env`. Never expose or commit real secrets. MySQL setup details are in `docs/setup.md`.

## Implementation guidance

- Follow the existing TypeScript and file organization; avoid adding dependencies when the current stack already handles the need.
- Validate request input with the existing Zod validators, protect user-specific routes with the existing authentication middleware, and scope database reads/writes to the authenticated user.
- Use Prisma migrations for schema changes and update seed data or documentation when their assumptions change.
- Keep frontend mock/local storage behavior explicit. When connecting a page to the API, follow existing route and response conventions and update the mapping documentation if the integration state changes.
- Preserve unrelated user changes. Inspect `git status` before editing and do not overwrite existing work.
- Do not run tests or other verification commands unless the user asks for verification; report what was and was not checked.

## Documentation notes

Use MySQL 8 consistently. Some older project documentation may describe earlier PostgreSQL or MVP states; check `backend/prisma/schema.prisma`, `backend/src/config/env.ts`, and current route/service code before relying on it. `readme.md` and `README.md` may appear as separate tracked paths in Git history; inspect repository status before changing either.
