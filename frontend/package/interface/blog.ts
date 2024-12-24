import { BlogMeta, Blog } from "../models/blog";

/**
 * Interface for blog-related operations
 * Implementations should provide methods for fetching articles, categories, and more.
 *
 */
export default interface BlogInterface {
  /**
   * Get paginated articles
   * @param start end of list blog meta before or null
   * @param limit Number of articles to retrieve
   * @returns Promise of array of Blog objects
   */
  getArticles(start: BlogMeta | null, limit: number): Promise<BlogMeta[]>;

  /**
   * Get articles filtered by category with pagination
   * @param category Category to filter by
   * @param start Starting article for pagination
   * @param limit Number of articles to retrieve
   * @returns Promise of array of Blog objects
   */
  getArticlesByCategory(
    category: string,
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]>;

  /**
   * Get a single article by its ID
   * @param id Article ID to retrieve
   * @returns Promise of a Blog object
   */
  getArticleById(id: number): Promise<Blog>;

  /**
   * Search articles with pagination
   * @param search Search query string
   * @param start Starting article for pagination
   * @param limit Number of articles to retrieve
   * @returns Promise of array of Blog objects
   */
  getArticleBySearch(
    search: string,
    categoriry: string | null,
    start: BlogMeta | null,
    limit: number
  ): Promise<BlogMeta[]>;

  /**
   * Get all available categories
   * @returns Promise of array of category strings
   */
  getCategories(): Promise<string[]>;
}
