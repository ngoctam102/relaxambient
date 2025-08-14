import type { MDXComponents } from "mdx/types";

// Tuỳ ý tuỳ biến các thẻ markdown -> component của bạn
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ví dụ: link có style sẵn
    a: (props) => <a {...props} className="text-blue-600 underline" />,
    // ví dụ: h1 style to đẹp
    h1: (props) => <h1 {...props} className="text-3xl font-bold mt-6 mb-4" />,
    // giữ nguyên những map khác (nếu có)
    ...components,
  };
}
