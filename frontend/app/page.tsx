import { blogRepository } from "./config/blogService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HomeApp from "./home";
import { BlogMeta } from "@/package/models/blog";

export default async function HomePage() {
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeApp />
    </HydrationBoundary>
  );
}
