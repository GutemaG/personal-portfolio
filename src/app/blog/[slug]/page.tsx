import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

// Static export needs at least one path; "_none" is a placeholder for an empty blog and is never linked.
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_none" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "_none") return { title: "Blog" };
  const post = await getPost(slug);
  return { title: post.title, description: post.description };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  if (slug === "_none") {
    return (
      <div className="prose">
        <h1>Coming soon...</h1>
      </div>
    );
  }
  const post = await getPost(slug);

  return (
    <article className="prose">
      <nav className="breadcrumb">
        <Link href="/blog/">Blog</Link> › {post.title}
      </nav>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
