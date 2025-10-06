import Link from "next/link";
import FeedbackForm from "@/components/feedback-form";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { readFeedback } from "@/lib/feedback";
import { submitFeedback } from "./actions";

export default async function Home() {
  const feedback = await readFeedback();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-12">
      <div className="flex justify-end">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>

      <header className="grid gap-3 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">
          Full-stack demo
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Mini Feedback Board
        </h1>
        <p className="text-base text-foreground/75 sm:text-lg">
          This page renders server-side with notes loaded from our Upstash Redis store in
          production. When running locally without Upstash credentials it falls back to
          the <code>data/feedback.json</code> file.
          Submit the form to trigger a Next.js Server Action that persists your note and
          revalidates the list instantly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard">Visit the dashboard demo</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/eda">Open the EDA dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <section className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest notes</h2>
            <a
              href="/api/feedback"
              className="text-sm font-medium text-blue-600 underline hover:text-blue-700"
            >
              View JSON API
            </a>
          </div>

          <ul className="grid gap-4">
            {feedback.length === 0 ? (
              <li className="rounded-lg border border-dashed border-foreground/40 p-6 text-sm text-foreground/70">
                No feedback yet—be the first to leave a note.
              </li>
            ) : (
              feedback.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl border border-foreground/10 bg-background px-5 py-4 shadow-sm"
                >
                  <p className="text-sm font-medium text-foreground/80">{entry.author}</p>
                  <p className="mt-1.5 text-base leading-normal text-foreground">
                    {entry.message}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>

        <aside className="grid gap-6">
          <h2 className="text-xl font-semibold">Share your thoughts</h2>
          <FeedbackForm
            action={submitFeedback}
            initialState={{ status: "idle" }}
          />
          <p className="text-sm text-foreground/70">
            Submissions persist to Upstash Redis in production and fall back to the
            <code>data/feedback.json</code> file during local development. Both the form and
            the <code>/api/feedback</code> route reuse the same helper in
            <code>src/lib/feedback.ts</code> to stay in sync.
          </p>
        </aside>
      </main>
    </div>
  );
}
