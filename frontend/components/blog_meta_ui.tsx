/* eslint-disable @next/next/no-img-element */
import { BlogMeta } from "@/package/models/blog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface BlogMetaUIProps {
  blogMeta: BlogMeta;
  className?: string;
  onClick?: () => void;
}

export function BlogMetaUI({
  blogMeta,
  className = "text-lg md:text-xl lg:text-2xl",
  onClick,
}: BlogMetaUIProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col md:flex-row gap-4 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
    >
      {/* Image container - responsive width */}
      <div className="w-full md:w-1/3 lg:w-2/5 flex-shrink-0">
        <img
          src={blogMeta.imageUrl}
          alt={blogMeta.title}
          className="rounded-lg shadow-md w-full aspect-video object-cover"
        />
      </div>

      {/* Content container - reordered: title, categories, date */}
      <div className="w-full md:w-2/3 lg:w-3/5 flex flex-col gap-2">
        {/* Title */}
        <h2 className={cn("font-bold leading-tight", className)}>
          {blogMeta.title}
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {blogMeta.categories.map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="font-medium text-sm md:text-base"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Date */}
        <span className="flex items-center text-sm md:text-base text-muted-foreground">
          <Calendar className="w-4 h-4 lex-shrink-0 mr-2" />
          {blogMeta.date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export function BlogMetaUiList({
  blogMetaList,
  onBlogClick,
}: {
  blogMetaList: BlogMeta[];
  onBlogClick?: (blog: BlogMeta) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {blogMetaList.map((blog, index) => (
        <BlogMetaUI
          key={index}
          blogMeta={blog}
          onClick={() => onBlogClick?.(blog)}
        />
      ))}
    </div>
  );
}
