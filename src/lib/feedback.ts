import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export type FeedbackEntry = {
  id: string;
  author: string;
  message: string;
};

const dataFilePath = join(process.cwd(), "data", "feedback.json");

export async function readFeedback(): Promise<FeedbackEntry[]> {
  const raw = await readFile(dataFilePath, "utf-8");
  const parsed = JSON.parse(raw) as FeedbackEntry[];
  return parsed;
}

export async function addFeedback(
  input: Omit<FeedbackEntry, "id">
): Promise<FeedbackEntry> {
  const current = await readFeedback();
  const entry: FeedbackEntry = { id: randomUUID(), ...input };
  const updated = JSON.stringify([entry, ...current], null, 2);
  await writeFile(dataFilePath, updated, "utf-8");
  return entry;
}
