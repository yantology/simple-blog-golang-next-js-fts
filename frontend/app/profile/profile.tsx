"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { blogRepository } from "../config/blogService";
import { BlogMeta } from "@/package/models/blog";
import { BlogMetaUiList } from "@/components/blog_meta_ui";
import LoadMoreButton from "@/components/load_more_button";
import { useCallback, useMemo } from "react";
import ProfileCard, { ProfileMeta } from "./element";

export default function Profile() {
  const limit = 4;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isErrorData,
  } = useInfiniteQuery<BlogMeta[], Error>({
    queryKey: ["getArticles", limit],
    queryFn: async ({ pageParam }) =>
      blogRepository.getArticles(pageParam as BlogMeta | null, limit),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < limit) return undefined;
      return lastPage[lastPage.length - 1] ?? undefined;
    },
    initialPageParam: null as BlogMeta | null,
  });

  const allBlogMeta = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data?.pages]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  if (isErrorData) {
    return <div className="text-red-500">Error: {isErrorData.valueOf()}</div>;
  }

  const profileData: ProfileMeta = {
    name: "Nama Anda",
    role: "Software Developer",
    bio: "Bio Anda di sini...",
  };

  return (
    <div>
      <ProfileCard profile={profileData}>
        <BlogMetaUiList blogMetaList={allBlogMeta} />
        {hasNextPage && (
          <LoadMoreButton
            onClick={handleLoadMore}
            isLoading={isFetchingNextPage}
          />
        )}
      </ProfileCard>
    </div>
  );
}
