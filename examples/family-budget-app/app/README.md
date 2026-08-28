# Common Ground App

React/Vite family-budget client with two runtime modes:

- Demo mode when Supabase environment variables are absent.
- Shared household mode with magic-link authentication when configured.

Copy `.env.example` to `.env.local` for the shared path. The SQL migration is under `supabase/migrations/`.

```bash
npm ci
npm test
npm run lint
npm run build
```
