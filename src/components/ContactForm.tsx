"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function sanitize(value: string): string {
    return value.trim().replace(/[<>]/g, "");
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.email.trim()) {
      e.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Некорректный email";
    }
    if (!form.message.trim()) e.message = "Введите сообщение";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const sanitizedForm = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      message: sanitize(form.message),
    };
    // TODO: replace with actual API call
    console.log("Contact form submitted:", sanitizedForm);
    setSubmitted(true);
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
      <div>
        <label htmlFor="name" className="block text-small font-medium text-foreground mb-1.5">
          Имя
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
          className="w-full px-4 py-2.5 rounded-(--radius-md) border border-border bg-surface-sunken text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          placeholder="Ваше имя"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p id="name-error" className="mt-1 text-caption text-error" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-small font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={254}
          className="w-full px-4 py-2.5 rounded-(--radius-md) border border-border bg-surface-sunken text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          placeholder="email@example.com"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p id="email-error" className="mt-1 text-caption text-error" role="alert">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-small font-medium text-foreground mb-1.5">
          Сообщение
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          maxLength={2000}
          className="w-full px-4 py-2.5 rounded-(--radius-md) border border-border bg-surface-sunken text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y"
          placeholder="Расскажите о вашем проекте..."
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p id="message-error" className="mt-1 text-caption text-error" role="alert">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 rounded-(--radius-lg) bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-md cursor-pointer"
      >
        Отправить сообщение
      </button>
    </form>
  );
}
