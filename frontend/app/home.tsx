"use client";
import { useState, useMemo, useCallback } from "react";
import { blogRepository } from "./config/blogService";
import HomeAside from "./sematic/home_aside";
import HomeSection from "./sematic/home_section";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BlogMeta } from "@/package/models/blog";
import { memo } from "react";

const MemoizedHomeSection = memo(HomeSection);
const MemoizedHomeAside = memo(HomeAside);

export default function HomeApp() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const limit = 4;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isErrorData,
  } = useInfiniteQuery<BlogMeta[], Error>({
    queryKey: ["getArticles", category, limit, search],
    queryFn: async ({ pageParam }) => {
      if (search != "") {
        return blogRepository.getArticleBySearch(
          search,
          category,
          pageParam as BlogMeta | null,
          limit
        );
      }

      if (category != "All") {
        return blogRepository.getArticlesByCategory(
          category,
          pageParam as BlogMeta,
          limit
        );
      }

      return blogRepository.getArticles(pageParam as BlogMeta | null, limit);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < limit) return undefined;
      return lastPage[lastPage.length - 1] ?? undefined;
    },
    initialPageParam: null as BlogMeta | null,
  });

  const { data: categories, isError: isErrorCategories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => blogRepository.getCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const processedCategories = useMemo(() => {
    return categories ? ["All", ...categories] : [];
  }, [categories]);

  const allBlogMeta = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data?.pages]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);
  }, []);

  if (isErrorData || isErrorCategories) {
    return (
      <div className="text-red-500">
        Error: {(isErrorData || isErrorCategories).valueOf()}
      </div>
    );
  }

  return (
    <div className="container mx-auto flex-1 p-4 ">
      <main className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-1">
        <MemoizedHomeSection
          title="Blog"
          subtitle="Lorem ipsum hahahah"
          blogMeta={allBlogMeta}
          onClick={handleLoadMore}
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage}
        />
        <MemoizedHomeAside
          categories={processedCategories}
          stateCategory={category}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearchChange}
        />
      </main>
    </div>
  );
}
