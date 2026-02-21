import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Gets the slugs of all MDX posts.
 * @returns {string[]} An array of file names.
 */
export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

/**
 * Retrieves a single post by its slug.
 * @param {string} slug - The slug of the post (without .mdx).
 * @returns {Post} The post data including frontmatter and content.
 */
export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const frontmatter: PostFrontmatter = {
        title: data.title || '',
        date: data.date || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || '',
        coverImage: data.coverImage,
        slug: realSlug,
    };

    return {
        frontmatter,
        content,
    };
}

/**
 * Retrieves all posts sorted by date descending.
 * @returns {Post[]} An array of posts.
 */
export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map(slug => getPostBySlug(slug))
        .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));

    return posts;
}
