import type { Metadata } from "next";
import Image from "next/image";
import { MdxContent } from "@/components/MdxContent";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "О нас",
  description: "Команда SEO агентства «Точка Успеха» — опыт, ценности и миссия.",
};

const team = [
  { name: "Владимир Кононцев", role: "Руководитель, SEO-стратег", focus: "eCommerce, интернет-магазины", photo: "/images/team/photo_kononcev.png" },
  { name: "Евгений", role: "SEO-эксперт", focus: "Международные проекты", photo: null },
  { name: "Надежда Салеева", role: "Контент-менеджер", focus: "Контент-стратегия", photo: "/images/team/photo_saleyeva.png" },
  { name: "Настя Ворса", role: "Аналитик", focus: "Данные и аналитика", photo: null },
];

function getAboutContent(): string {
  const filePath = path.join(process.cwd(), "content/pages/about.mdx");
  if (!fs.existsSync(filePath)) return "";
  const { content } = matter(fs.readFileSync(filePath, "utf-8"));
  return content;
}

export default function AboutPage() {
  const content = getAboutContent();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-divi">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 font-semibold text-foreground">О нас</h1>
          <p className="mt-3 text-body text-muted max-w-2xl mx-auto">
            Команда профессионалов с многолетним опытом в SEO
          </p>
        </div>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-h2 font-semibold text-foreground text-center mb-8">Наша команда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-(--radius-lg) bg-surface-elevated border border-border text-center"
              >
                {member.photo ? (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-(--radius-full) overflow-hidden">
                    <Image src={member.photo} alt={member.name} width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-(--radius-full) bg-primary-light flex items-center justify-center">
                    <span className="text-h3 font-medium text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-body font-semibold text-foreground">{member.name}</h3>
                <p className="mt-1 text-small text-primary">{member.role}</p>
                <p className="mt-1 text-caption text-muted">{member.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MDX content */}
        <section className="mx-auto max-w-[700px]">
          <MdxContent source={content} />
        </section>
      </div>
    </div>
  );
}
