import Link from "next/link";
import type { ServiceMeta } from "@/lib/types";

interface ServiceListItemProps {
  service: ServiceMeta;
}

export function ServiceListItem({ service }: ServiceListItemProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-wrap justify-between items-center py-6 border-b border-[#E4EDF4] relative"
    >
      <div className="flex-[0_0_66%] max-w-[66%] transition-transform duration-150 ease-out group-hover:translate-x-[40px] max-sm:flex-[0_0_60%] max-sm:max-w-[60%] max-sm:group-hover:translate-x-0">
        <h3 className="text-[26px] font-semibold text-[var(--foreground)] mb-3 max-md:text-[24px] max-sm:text-[18px] max-sm:mb-0">
          {service.title}
        </h3>
        <p className="text-[15px] leading-[1.7em] text-[var(--foreground-muted)] max-sm:hidden">
          {service.description}
        </p>
      </div>
      <div className="flex-[0_0_30%] max-w-[30%] text-right max-sm:flex-[0_0_35%] max-sm:max-w-[35%]">
        <span className="inline-block text-[14px] font-bold uppercase border border-[#E30613] text-[#E30613] rounded-[100px] py-[5px] px-[35px] transition-colors duration-150 group-hover:bg-[#E30613] group-hover:text-white max-sm:px-[25px]"
          style={{ fontFamily: "Mulish, sans-serif" }}
        >
          <span className="max-sm:hidden">Подробнее</span>
          <span className="hidden max-sm:inline">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
