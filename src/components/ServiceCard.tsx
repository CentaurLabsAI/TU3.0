import Link from "next/link";
import Image from "next/image";
import type { ServiceMeta } from "@/lib/types";

const serviceImages: Record<string, string> = {
  "seo-audit": "/images/services/seo-audit-main.jpg",
  "seo-prodvizhenie": "/images/services/seo-at-work.jpg",
  "semanticheskoe-yadro": "/images/services/seo-specialist-semantic-core.jpg",
  "kontent-plan": "/images/services/seo-content-plan-creation.jpg",
  "migracziya-sajta": "/images/services/seo-migration-work.jpg",
  "sozdanie-seo-dashbordov": "/images/services/site-migration-process-fin.jpg",
};

const iconMap: Record<string, React.ReactNode> = {
  search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  "trending-up": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  database: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "file-text": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  "refresh-cw": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  "bar-chart": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
};

interface ServiceCardProps {
  service: ServiceMeta;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const imageSrc = serviceImages[service.slug];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-[40px] bg-surface-elevated shadow-sm hover:shadow-lg transition-all overflow-hidden"
    >
      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 text-center">
        <div className="w-10 h-10 flex items-center justify-center mx-auto mb-3 text-primary">
          {iconMap[service.icon] ?? iconMap.search}
        </div>
        <h3 className="text-[18px] font-semibold text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-[13px] text-muted leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  );
}
