/**
 * Blog Utilities
 * Functions to read and parse MDX blog posts
 *
 * INSTALLATION REQUIRED:
 * npm install gray-matter next-mdx-remote
 *
 * These dependencies are needed for the blog system to work.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  // Return empty array if directory doesn't exist yet
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".mdx" or ".md" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || "",
        excerpt: matterResult.data.excerpt || "",
        author: matterResult.data.author || "Anonymous",
        date: matterResult.data.date || new Date().toISOString(),
        category: matterResult.data.category || "Uncategorized",
        tags: matterResult.data.tags || [],
        image: matterResult.data.image,
        content: matterResult.content,
      } as BlogPost;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    // Try .mdx first
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, "utf8");
    } else {
      // Try .md if .mdx doesn't exist
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, "utf8");
      } else {
        return null;
      }
    }

    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || "",
      excerpt: matterResult.data.excerpt || "",
      author: matterResult.data.author || "Anonymous",
      date: matterResult.data.date || new Date().toISOString(),
      category: matterResult.data.category || "Uncategorized",
      tags: matterResult.data.tags || [],
      image: matterResult.data.image,
      content: matterResult.content,
    };
  } catch (error: unknown) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}
