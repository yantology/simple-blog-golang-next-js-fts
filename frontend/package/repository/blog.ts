import BlogInterface from "../interface/blog";
import { BlogMeta, Blog } from "../models/blog";

/**
 * Repository class for handling blog-related operations.
 * Acts as a wrapper around BlogInterface for centralized data access.
 * @see BlogInterface
 */
export class BlogRepository {
  /**
   * Initialize repository with a blog service implementation
   * @param blogService Implementation of BlogInterface for data operations
   */
  constructor(private blogService: BlogInterface) {}

  /**
   * Fetch paginated articles
   * @param start Starting article for pagination
   * @param limit Number of articles to retrieve
   * @returns Promise resolving to array of Blog objects
   * @throws Error if fetching fails
   */
  async getArticles(
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      return await this.blogService.getArticles(start, limit);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }

  /**
   * Fetch articles filtered by category with pagination
   * @param category Category to filter by
   * @param start Starting article for pagination
   * @param limit Number of articles to retrieve
   * @returns Promise resolving to filtered array of Blog objects
   * @throws Error if fetching fails
   */
  async getArticlesByCategory(
    category: string,
    start: BlogMeta,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      return await this.blogService.getArticlesByCategory(
        category,
        start,
        limit
      );
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      throw error;
    }
  }

  /**
   * Fetch single article by ID
   * @param id ID of article to retrieve
   * @returns Promise resolving to Blog object
   * @throws Error if article not found or fetching fails
   */
  async getArticleById(id: number): Promise<Blog> {
    try {
      return await this.blogService.getArticleById(id);
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      throw error;
    }
  }

  /**
   * Search articles with pagination
   * @param search Search query string
   * @param start Starting article for pagination
   * @param limit Number of articles to retrieve
   * @returns Promise resolving to array of matching Blog objects
   * @throws Error if search fails
   */
  async getArticleBySearch(
    search: string,
    category: string | null,
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]> {
    try {
      return await this.blogService.getArticleBySearch(
        search,
        category,
        start,
        limit
      );
    } catch (error) {
      console.error("Error fetching articles by search:", error);
      throw error;
    }
  }

  /**
   * Fetch all categories
   * @returns Promise resolving to array of category strings
   * @throws Error if fetching fails
   */
  async getCategories(): Promise<string[]> {
    try {
      return await this.blogService.getCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
}
