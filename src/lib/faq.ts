import fs from "fs";
import path from "path";
import type { FaqItem } from "./types";

const FAQ_PATH = path.join(process.cwd(), "content/faq/faq-items.json");

export function getAllFaqItems(): FaqItem[] {
  if (!fs.existsSync(FAQ_PATH)) return [];
  const raw = fs.readFileSync(FAQ_PATH, "utf-8");
  const items: FaqItem[] = JSON.parse(raw);
  return items;
}

export function getFaqByCategory(category: string): FaqItem[] {
  return getAllFaqItems().filter((item) => item.category === category);
}

export function getFaqCategories(): string[] {
  const items = getAllFaqItems();
  const categories = new Set(items.map((i) => i.category).filter(Boolean));
  return Array.from(categories).sort();
}
