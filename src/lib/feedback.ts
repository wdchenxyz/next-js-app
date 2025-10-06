import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export type FeedbackEntry = {
  id: string;
  author: string;
  message: string;
};

const dataFilePath = join(process.cwd(), "data", "feedback.json");

const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

const redisClient = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

if (redisClient) {
  console.info("feedback storage: using Upstash Redis client");
} else {
  console.info("feedback storage: using local JSON file fallback");
}

async function readFromRedis(): Promise<FeedbackEntry[]> {
  const entries = await redisClient!.lrange<FeedbackEntry | string>("feedback", 0, -1);

  return entries.map((value) =>
    typeof value === "string" ? (JSON.parse(value) as FeedbackEntry) : (value as FeedbackEntry)
  );
}

async function readFromFile(): Promise<FeedbackEntry[]> {
  const raw = await readFile(dataFilePath, "utf-8");
  return JSON.parse(raw) as FeedbackEntry[];
}

export async function readFeedback(): Promise<FeedbackEntry[]> {
  if (redisClient) {
    return readFromRedis();
  }

  return readFromFile();
}

async function writeToFile(entries: FeedbackEntry[]) {
  const updated = JSON.stringify(entries, null, 2);
  await writeFile(dataFilePath, updated, "utf-8");
}

export async function addFeedback(
  input: Omit<FeedbackEntry, "id">
): Promise<FeedbackEntry> {
  const entry: FeedbackEntry = { id: randomUUID(), ...input };

  if (redisClient) {
    await redisClient.lpush("feedback", JSON.stringify(entry));
    return entry;
  }

  const current = await readFromFile();
  await writeToFile([entry, ...current]);
  return entry;
}
