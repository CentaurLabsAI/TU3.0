"use client";

import { useState } from "react";

export function HeroContactForm() {
  const [form, setForm] = useState({ name: "", email: "", site: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    console.log("Hero form submitted:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-4 rounded-[var(--radius-lg)] bg-success/10 border border-success/30 text-center">
        <p className="text-[16px] font-semibold text-[var(--foreground)]">Спасибо!</p>
        <p className="mt-1 text-[13px] text-[var(--muted)]">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Имя"
          maxLength={100}
          className="w-full text-[18px] py-[7px] px-[20px] text-[var(--foreground)] bg-transparent border-b border-[#ccc] focus:border-[var(--primary)] focus:outline-none transition-colors placeholder:text-[var(--muted-light)]"
        />
        <input
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email или телефон"
          maxLength={254}
          className="w-full text-[18px] py-[7px] px-[20px] text-[var(--foreground)] bg-transparent border-b border-[#ccc] focus:border-[var(--primary)] focus:outline-none transition-colors placeholder:text-[var(--muted-light)]"
        />
      </div>
      <input
        type="url"
        value={form.site}
        onChange={(e) => setForm({ ...form, site: e.target.value })}
        placeholder="Адрес сайта"
        maxLength={200}
        className="w-full text-[18px] py-[7px] px-[20px] text-[var(--foreground)] bg-transparent border-b border-[#ccc] focus:border-[var(--primary)] focus:outline-none transition-colors placeholder:text-[var(--muted-light)]"
      />
      <textarea
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Сообщение"
        maxLength={2000}
        className="w-full text-[18px] py-[7px] px-[20px] text-[var(--foreground)] bg-transparent border-b border-[#ccc] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y placeholder:text-[var(--muted-light)]"
      />
      <button
        type="submit"
        className="w-full sm:w-auto text-[16px] font-semibold uppercase px-[40px] py-[8px] rounded-[90px] bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors cursor-pointer"
        style={{ fontFamily: "Mulish, sans-serif" }}
      >
        Отправить
      </button>
    </form>
  );
}
