This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

Create a `.env.local` with the Upstash connection secrets if you want to persist
feedback through Redis while developing locally:

```
KV_REST_API_URL=...        # or UPSTASH_REDIS_REST_URL
KV_REST_API_TOKEN=...      # or UPSTASH_REDIS_REST_TOKEN
```

When these variables are absent the app falls back to reading/writing the
`data/feedback.json` file so you can still test the flow offline.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Explain each file
  - src/app/api/feedback/route.ts – API route for /api/feedback; external clients can
    GET/POST notes through it.
  - src/app/page.tsx – Server component for the / route; reads feedback, renders the
    list, and mounts the form.
  - src/app/layout.tsx – Root layout applied to every route; sets up <html>, <body>,
    global fonts, metadata, and imports globals.css.
  - src/app/globals.css – Global stylesheet; pulls in Tailwind v4, defines light/dark
    palette variables, and sets base typography.
  - src/components/feedback-form.tsx – Client component implementing the feedback form
    UI; calls the server action on submit.
  - src/lib/feedback.ts – Shared data layer (“backend” helpers) that talk to Upstash
    Redis (or the fallback JSON file in local dev); used by both the page and API
    route.
  - src/app/actions.ts – Server actions invoked from the form; validates submissions,
    persists them, and triggers cache revalidation.
