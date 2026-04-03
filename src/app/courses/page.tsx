import type { Metadata } from "next";
import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Курсы",
  description: "Онлайн-курсы по искусственному интеллекту и нейросетям от агентства «Точка Успеха».",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-bold text-foreground">Курсы</h1>
          <p className="mt-3 text-body text-muted max-w-2xl mx-auto">
            Обучающие программы по ИИ и нейросетям для специалистов и новичков
          </p>
        </div>

        <div className="space-y-4">
          {courses.map((course, i) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex items-center gap-4 p-6 rounded-(--radius-lg) bg-surface-elevated border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-(--radius-full) bg-primary-light text-primary font-bold text-body">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h2 className="text-h4 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </h2>
                {course.description && (
                  <p className="mt-1 text-small text-muted truncate">{course.description}</p>
                )}
              </div>
              <svg className="w-5 h-5 shrink-0 ml-auto text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
