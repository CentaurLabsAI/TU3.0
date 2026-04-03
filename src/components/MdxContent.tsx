import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/../mdx-components";

interface MdxContentProps {
  source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  const components = useMDXComponents({});
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { format: "md" } }}
      />
    </div>
  );
}
