# HireX

Job Hunting Platform — Next.js frontend with optional Express backend.

## Quick Start

### Option 1: Next.js only (simplest)

Uses built-in API routes. No separate server needed.

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Auth (register/login) works via `/api/register` and `/api/login`.

### Option 2: With Express backend

Uses Express for auth and `/api/posts`. Requires both servers.

1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. In `.env`, set:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
3. Install & run both:
   ```bash
   npm install
   cd server && npm install && cd ..
   npm run dev:all
   ```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

## Scripts

| Command       | Description                    |
|--------------|--------------------------------|
| `npm run dev`| Next.js dev server             |
| `npm run server` | Express backend (port 5000) |
| `npm run dev:all` | Frontend + backend together |
| `npm run build` | Build Next.js for production |
| `npm run lint` | Run ESLint                    |

## Project Structure

```
├── src/app/          # Next.js pages & API routes
├── src/lib/          # Axios, Redux, utils
├── server/           # Express backend (optional)
└── docs/             # AXIOS-REDUX-FLOW.md
```

## Auth Flow

- **Register / Login / Forgot password**: Form → `fetch()` → API
- **Social (Google, GitHub)**: NextAuth OAuth
- **Token**: Stored in `localStorage` when using Express backend

## Troubleshooting

**Auth errors with Express backend:**
- Set `NEXT_PUBLIC_API_URL=http://localhost:5000` (base URL only, no `/api/auth`)
- Restart Next.js after changing `.env` (required for `NEXT_PUBLIC_` vars)

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Axios ↔ Redux Flow](docs/AXIOS-REDUX-FLOW.md)
