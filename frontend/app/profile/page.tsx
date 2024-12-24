import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { blogRepository } from "../config/blogService";
import { BlogMeta } from "@/package/models/blog";
import Profile from "./profile";

export default async function ProfilePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["getArticles", "All", 4],
      queryFn: async ({ pageParam }) =>
        blogRepository.getArticles(pageParam as BlogMeta | null, 4),
      initialPageParam: null,
    }),
    queryClient.prefetchQuery({
      queryKey: ["getCategories"],
      queryFn: async () => blogRepository.getCategories(),
    }),
  ]);

  return (
    <div className="container mx-auto md:px-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile />
      </HydrationBoundary>
    </div>
  );
}
