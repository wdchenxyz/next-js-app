"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type {
  FeedbackFormState,
} from "@/app/actions";

type FeedbackFormAction = (
  prevState: FeedbackFormState,
  formData: FormData
) => Promise<FeedbackFormState>;

type FeedbackFormProps = {
  action: FeedbackFormAction;
  initialState: FeedbackFormState;
};

const labelClasses = "block text-sm font-medium text-foreground";
const fieldClasses =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-foreground shadow-sm focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/30";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-black"
      disabled={pending}
    >
      {pending ? "Sending…" : "Share feedback"}
    </button>
  );
}

export default function FeedbackForm({ action, initialState }: FeedbackFormProps) {
  const [state, formAction] = useActionState<FeedbackFormState, FormData>(
    action,
    initialState
  );

  return (
    <form
      className="grid gap-4 rounded-lg border border-black/10 bg-background p-6 shadow-sm"
      action={formAction}
    >
      <div className="grid gap-2">
        <label htmlFor="author" className={labelClasses}>
          Your name
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Ada Lovelace"
          className={fieldClasses}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className={labelClasses}>
          Feedback
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us what's working or what could be better."
          className={fieldClasses}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/80">
          {state.status === "success"
            ? state.message
            : state.status === "error"
              ? state.message
              : "We'll publish your note instantly."}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
