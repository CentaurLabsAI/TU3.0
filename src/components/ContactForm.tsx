"use client";

import { useState } from "react";

const TOPIC_OPTIONS = [
  "SEO аудит",
  "SEO продвижение",
  "Семантическое ядро",
  "Контент-план",
  "Миграция сайта",
  "SEO дашборды",
  "Другое",
] as const;

interface FormData {
  name: string;
  contact: string;
  website: string;
  topic: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  contact?: string;
  website?: string;
  topic?: string;
  message?: string;
  privacy?: string;
}

const inputClass =
  "w-full bg-transparent border-0 border-b border-[#ccc] text-[18px] text-[#000] dark:text-foreground px-5 py-[7px] placeholder:text-muted-light focus:outline-none focus:border-primary transition-colors";

const selectClass =
  "w-full bg-transparent border-0 border-b border-[#ccc] text-[18px] text-[#000] dark:text-foreground px-5 py-[7px] focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer";

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    contact: "",
    website: "",
    topic: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function sanitize(value: string): string {
    return value.trim().replace(/[<>]/g, "");
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.contact.trim()) {
      e.contact = "Введите email или телефон";
    }
    if (form.website.trim() && !/^https?:\/\/.+|^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}/.test(form.website.trim())) {
      e.website = "Некорректный адрес сайта";
    }
    if (!form.topic) e.topic = "Выберите тему";
    if (!form.message.trim()) e.message = "Введите сообщение";
    if (!form.privacy) e.privacy = "Необходимо согласие на обработку данных";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const sanitizedForm = {
      name: sanitize(form.name),
      contact: sanitize(form.contact),
      website: sanitize(form.website),
      topic: sanitize(form.topic),
      message: sanitize(form.message),
    };
    // TODO: replace with actual API call
    console.log("Contact form submitted:", sanitizedForm);
    setSubmitted(true);
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (submitted) {
    return (
      <div className="p-6 rounded-(--radius-lg) bg-success/10 border border-success/30 text-center">
        <p className="text-body font-semibold text-foreground">Спасибо за обращение!</p>
        <p className="mt-2 text-small text-muted">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Row 1: Имя + Email или телефон */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            className={inputClass}
            placeholder="Имя"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-caption text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <input
            id="contact"
            type="text"
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            maxLength={254}
            className={inputClass}
            placeholder="Email или телефон"
            aria-describedby={errors.contact ? "contact-error" : undefined}
            aria-invalid={!!errors.contact}
          />
          {errors.contact && (
            <p id="contact-error" className="mt-1 text-caption text-error" role="alert">
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Адрес сайта + Тема */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <input
            id="website"
            type="text"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            maxLength={200}
            className={inputClass}
            placeholder="Адрес сайта"
            aria-describedby={errors.website ? "website-error" : undefined}
            aria-invalid={!!errors.website}
          />
          {errors.website && (
            <p id="website-error" className="mt-1 text-caption text-error" role="alert">
              {errors.website}
            </p>
          )}
        </div>
        <div className="relative">
          <select
            id="topic"
            value={form.topic}
            onChange={(e) => update("topic", e.target.value)}
            className={`${selectClass} ${!form.topic ? "text-muted-light" : ""}`}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            aria-invalid={!!errors.topic}
          >
            <option value="" disabled>
              Тема
            </option>
            {TOPIC_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.topic && (
            <p id="topic-error" className="mt-1 text-caption text-error" role="alert">
              {errors.topic}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Сообщение (full width) */}
      <div>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={2000}
          className={`${inputClass} resize-y`}
          placeholder="Сообщение"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-caption text-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Privacy checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => update("privacy", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-primary cursor-pointer"
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
            aria-invalid={!!errors.privacy}
          />
          <span className="text-small text-muted">
            Ваши данные будут обрабатываться в соответствии с Политикой конфиденциальности
          </span>
        </label>
        {errors.privacy && (
          <p id="privacy-error" className="mt-1 text-caption text-error" role="alert">
            {errors.privacy}
          </p>
        )}
      </div>

      {/* Submit button — Divi style */}
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-primary px-10 py-2 text-[16px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
        style={{ fontFamily: "Mulish, sans-serif" }}
      >
        Отправить
      </button>
    </form>
  );
}
