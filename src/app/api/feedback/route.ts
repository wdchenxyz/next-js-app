import { NextRequest } from "next/server";
import { addFeedback, readFeedback } from "@/lib/feedback";

const badRequest = (message: string) =>
  Response.json({ error: message }, { status: 400 });

export async function GET() {
  try {
    const feedback = await readFeedback();
    return Response.json({ feedback });
  } catch (error) {
    console.error("Failed to read feedback", error);
    return Response.json({ error: "Failed to load feedback" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const author = payload?.author?.trim();
    const message = payload?.message?.trim();

    if (!author) {
      return badRequest("Author is required");
    }

    if (!message) {
      return badRequest("Message is required");
    }

    const created = await addFeedback({ author, message });
    return Response.json({ feedback: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to add feedback", error);

    if (error instanceof SyntaxError) {
      return badRequest("Invalid JSON payload");
    }

    return Response.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
