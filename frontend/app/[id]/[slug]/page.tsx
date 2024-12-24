import { BlogMetaUI } from "@/components/blog_meta_ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { notFound } from "next/navigation";
import { blogRepository } from "@/app/config/blogService";

type Props = {
  params: {
    id: number;
    slug: string;
  };
};

// Mark the component as async
export default async function Article({ params }: Props) {
  const { id, slug } = await params;
  if (!id || !slug) {
    return notFound();
  }

  const blog = await blogRepository.getArticleById(Number(id));

  if (!blog) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-1">
      <main className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-1 px-4">
        <section className="md:col-span-3 p-6 rounded-lg">
          <BlogMetaUI blogMeta={blog.meta} className="text-4xl" />
          {/* Article Content */}
          <article className="prose max-w-none mt-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeHighlight,
                rehypeSlug,
                rehypeAutolinkHeadings,
              ]}
            >
              {blog.content.content}
            </ReactMarkdown>
          </article>
        </section>
        <aside className="md:col-span-1 bg-slate-400 p-6 rounded-lg shadow-sm border border-gray-200"></aside>
      </main>
    </div>
  );
}
