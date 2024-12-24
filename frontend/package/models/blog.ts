/**
 * Represents metadata for a blog post
 * @interface BlogMeta
 * @property {number} id - Unique identifier of the blog post
 * @property {string} imageUrl - URL of the blog post's featured image
 * @property {string} title - Title of the blog post
 * @property {Date} date - Publication date of the blog post
 * @property {string[]} categories - Array of categories the blog post belongs to
 * @property {number} idBlogContent - Reference ID to the blog's content
 */
export interface BlogMeta {
  id: number;
  imageUrl: string;
  title: string;
  date: Date;
  categories: string[];
  idBlogContent: number;
}

/**
 * Represents the content of a blog post
 * @interface BlogContent
 * @property {number} id - Unique identifier of the blog post
 * @property {string} content - HTML content of the blog post
 */
export interface BlogContent {
  id: number;
  content: string;
}

/**
 * Represents a blog post
 * @interface Blog
 * @property {BlogMeta} meta - Metadata of the blog post
 * @property {BlogContent} content - Content of the blog post
 */
export interface Blog {
  meta: BlogMeta;
  content: BlogContent;
}
