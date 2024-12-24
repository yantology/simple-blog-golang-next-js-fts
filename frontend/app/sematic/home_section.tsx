import Headline from "@/components/headline";
import { BlogMeta } from "@/package/models/blog";
import { BlogMetaUiList } from "@/components/blog_meta_ui";
import LoadMoreButton from "@/components/load_more_button";

interface HomeSectionProps {
  title: string;
  subtitle: string;
  blogMeta: BlogMeta[];
  onClick: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export default function HomeSection({
  title,
  subtitle,
  blogMeta,
  onClick,
  isLoading = false,
  hasMore = false,
}: HomeSectionProps) {
  console.log("HomeSection");
  return (
    <section className="md:col-span-3 spacing space-y-2">
      <Headline title={title} subtitle={subtitle} />
      <BlogMetaUiList blogMetaList={blogMeta} />
      {hasMore && <LoadMoreButton onClick={onClick} isLoading={isLoading} />}
    </section>
  );
}
