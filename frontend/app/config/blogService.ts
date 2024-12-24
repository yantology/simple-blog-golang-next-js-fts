import { BlogRepository } from "@/package/repository/blog";
import BlogService from "@/package/services/blog_internal";

export const blogRepository = new BlogRepository(new BlogService());
