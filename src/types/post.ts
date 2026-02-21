export interface PostFrontmatter {
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    coverImage?: string;
    slug: string;
}

export interface Post {
    frontmatter: PostFrontmatter;
    content: string;
}
