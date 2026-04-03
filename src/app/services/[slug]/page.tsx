import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { MdxContent } from "@/components/MdxContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = getAllServices().filter((s) => s.slug !== slug);

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-small text-muted" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Услуги</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium">{service.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main content */}
          <div>
            <h1 className="text-h1 font-bold text-foreground mb-3">{service.title}</h1>
            <p className="text-body text-muted mb-8">{service.description}</p>
            <MdxContent source={service.content} />
          </div>

          {/* Sidebar */}
          {allServices.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h2 className="text-small font-semibold text-foreground uppercase tracking-wider mb-4">
                  Другие услуги
                </h2>
                <ul className="space-y-2">
                  {allServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="block text-small text-muted hover:text-primary transition-colors py-1"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
