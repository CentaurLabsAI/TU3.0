import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      );
    },
    ...components,
  };
}
