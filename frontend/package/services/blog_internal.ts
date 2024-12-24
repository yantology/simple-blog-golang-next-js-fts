import BlogInterface from "../interface/blog";
import { BlogMeta, BlogContent, Blog } from "../models/blog";

const blogMetaMap: Map<number, BlogMeta> = new Map([
  [
    1,
    {
      id: 1,
      imageUrl: "https://picsum.photos/400/300",
      title: "Top Tech Trends to Watch in 2024",
      date: new Date("2024-01-15"),
      categories: ["Technology", "Innovation"],
      idBlogContent: 1,
    },
  ],
  [
    2,
    {
      id: 2,
      imageUrl: "https://picsum.photos/400/300",
      title: "Ethics in Artificial Intelligence",
      date: new Date("2024-01-25"),
      categories: ["Technology", "Ethics"],
      idBlogContent: 2,
    },
  ],
  [
    3,
    {
      id: 3,
      imageUrl: "https://picsum.photos/400/300",
      title: "The Future of Remote Work",
      date: new Date("2024-02-01"),
      categories: ["Work", "Technology"],
      idBlogContent: 3,
    },
  ],
  [
    4,
    {
      id: 4,
      imageUrl: "https://picsum.photos/400/300",
      title: "Simple Steps to Sustainable Living",
      date: new Date("2024-02-15"),
      categories: ["Lifestyle", "Environment"],
      idBlogContent: 4,
    },
  ],
  [
    5,
    {
      id: 5,
      imageUrl: "https://picsum.photos/400/300",
      title: "Protecting Your Digital Privacy",
      date: new Date("2024-03-01"),
      categories: ["Security", "Technology"],
      idBlogContent: 5,
    },
  ],
]);

const blogContentMap: Map<number, BlogContent> = new Map([
  [
    1,
    {
      id: 1,
      content: `# Tech Trends 2024
    
AI continues to revolutionize how we work and live. From autonomous vehicles to personalized medicine, the possibilities seem endless.

Edge computing is becoming increasingly important as IoT devices proliferate across industries.`,
    },
  ],
  [
    2,
    {
      id: 2,
      content: `# AI Ethics Today

Responsible AI development requires careful consideration of bias and fairness.

Transparency in AI decision-making processes is becoming increasingly crucial.`,
    },
  ],
  [
    3,
    {
      id: 3,
      content: `# Remote Work Evolution

Hybrid work models are becoming the new standard for many organizations globally.

Digital collaboration tools continue to evolve, making remote teamwork more effective.`,
    },
  ],
  [
    4,
    {
      id: 4,
      content: `# Sustainable Living Guide

Start with small changes in your daily routine. Replace single-use plastics with reusable alternatives.

Supporting local farmers and reducing food waste can make a significant impact.`,
    },
  ],
  [
    5,
    {
      id: 5,
      content: `# Digital Privacy Guide

Using strong, unique passwords for each account is your first line of defense.

Regular security audits of your digital accounts can prevent unauthorized access.`,
    },
  ],
]);

const categories: string[] = [
  "Technology",
  "Innovation",
  "Ethics",
  "Work",
  "Lifestyle",
  "Environment",
  "Security",
];

export default class BlogService implements BlogInterface {
  private blogsMeta: Map<number, BlogMeta> = blogMetaMap;

  private blogsContent: Map<number, BlogContent> = blogContentMap;
  private categories: string[] = categories;

  async getArticles(
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      const blogsArray = Array.from(this.blogsMeta.values());
      const startBlog =
        start != null
          ? blogsArray.findIndex(
              (blogMeta: BlogMeta) => blogMeta.id === start.id
            ) + 1
          : 0;
      if (startBlog === -1) return [];
      return Promise.resolve(blogsArray.slice(startBlog, startBlog + limit));
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
  }

  async getArticlesByCategory(
    category: string,
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      const filteredBlogs = Array.from(this.blogsMeta.values()).filter(
        (blog: BlogMeta) => blog.categories.includes(category)
      );

      const startIndex =
        start != null
          ? filteredBlogs.findIndex((blog: BlogMeta) => blog.id === start.id) +
            1
          : 0;
      if (startIndex === -1) return [];

      return Promise.resolve(
        filteredBlogs.slice(startIndex, startIndex + limit)
      );
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(
        `Failed to fetch articles for category ${category}: ${error.message}`
      );
    }
  }

  async getArticleById(id: number): Promise<Blog> {
    try {
      const blog = await this.createBlog(id);
      return Promise.resolve(blog);
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(
        `Failed to fetch article with id ${id}: ${error.message}`
      );
    }
  }

  private createBlog(id: number): Promise<Blog> {
    return new Promise((resolve, reject) => {
      try {
        const meta = this.blogsMeta.get(id);
        if (!meta) {
          reject(new Error(`Blog meta with id ${id} not found`));
          return;
        }

        const content = this.blogsContent.get(meta.idBlogContent);
        if (!content) {
          reject(
            new Error(`Blog content with id ${meta.idBlogContent} not found`)
          );
          return;
        }

        resolve({ meta, content });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getArticleBySearch(
    search: string,
    category: string | null,
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      const searchLower = search.toLowerCase();

      let filteredBlogs = Array.from(this.blogsMeta.values()).filter(
        (blog: BlogMeta) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.categories.some((cat: string) =>
            cat.toLowerCase().includes(searchLower)
          )
      );

      // Only filter by category if it's not null
      if (category !== null && category !== "All") {
        filteredBlogs = filteredBlogs.filter((blog: BlogMeta) =>
          blog.categories.includes(category)
        );
      }

      let startIndex = 0;

      // If start blog is provided, find its index and start from next item
      if (start !== null) {
        const foundIndex = filteredBlogs.findIndex(
          (blog: BlogMeta) => blog.id === start.id
        );
        // If found, start from next index, otherwise keep start at 0
        if (foundIndex !== -1) {
          startIndex = foundIndex + 1;
        }
      }

      return Promise.resolve(
        filteredBlogs.slice(startIndex, startIndex + limit)
      );
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(
        `Failed to search articles with query "${search}": ${error.message}`
      );
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      return Promise.resolve(this.categories);
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }
}
