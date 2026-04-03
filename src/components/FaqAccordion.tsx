"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openSlug === item.slug;
        return (
          <div
            key={item.slug}
            className="rounded-(--radius-lg) border border-border bg-surface-elevated overflow-hidden"
          >
            <button
              onClick={() => setOpenSlug(isOpen ? null : item.slug)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-surface-sunken transition-colors"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.slug}`}
              id={`faq-btn-${item.slug}`}
            >
              <span className="text-body font-medium text-foreground">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-panel-${item.slug}`}
              role="region"
              aria-labelledby={`faq-btn-${item.slug}`}
              className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-small text-muted leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
