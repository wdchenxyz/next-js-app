import FeedbackForm from "@/components/feedback-form";
import { readFeedback } from "@/lib/feedback";
import { submitFeedback } from "./actions";

export default async function Home() {
  const feedback = await readFeedback();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-12">
      <header className="grid gap-3 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">
          Full-stack demo
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Mini Feedback Board
        </h1>
        <p className="text-base text-foreground/75 sm:text-lg">
          This page renders server-side with data read from <code>data/feedback.json</code>.
          Submit the form to trigger a Next.js Server Action that persists your note and
          revalidates the list instantly.
        </p>
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
                  className="rounded-lg border border-foreground/10 bg-background p-6 shadow-sm"
                >
                  <p className="text-sm font-medium text-foreground/80">{entry.author}</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground">
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
            For demo purposes we store submissions inside <code>data/feedback.json</code>.
            Both the form and the <code>/api/feedback</code> route use the same file-backed
            helper in <code>src/lib/feedback.ts</code> to keep things in sync.
          </p>
        </aside>
      </main>
    </div>
  );
}
