import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";
import { MdxContent } from "@/components/MdxContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-small text-muted" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/courses" className="hover:text-primary transition-colors">Курсы</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{course.title}</li>
          </ol>
        </nav>

        <h1 className="text-h1 font-bold text-foreground mb-3">{course.title}</h1>
        {course.description && (
          <p className="text-body text-muted mb-8">{course.description}</p>
        )}

        <MdxContent source={course.content} />
      </div>
    </div>
  );
}
