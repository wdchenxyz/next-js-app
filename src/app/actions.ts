"use server";

import { revalidatePath } from "next/cache";
import { addFeedback } from "@/lib/feedback";

export type FeedbackFormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export async function submitFeedback(
  _prevState: FeedbackFormState,
  formData: FormData
): Promise<FeedbackFormState> {
  const author = String(formData.get("author") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!author || !message) {
    return {
      status: "error",
      message: "Please fill out both your name and message.",
    };
  }

  try {
    await addFeedback({ author, message });
    revalidatePath("/");
    return { status: "success", message: "Thanks for the feedback!" };
  } catch (error) {
    console.error("submitFeedback failed", error);
    return {
      status: "error",
      message: "We couldn't save your feedback. Please try again.",
    };
  }
}
