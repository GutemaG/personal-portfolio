import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="prose">
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <h3>Coming soon...</h3>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`}>
                <h2>
                  {p.title}
                  {p.draft && <span className="draft-badge">Draft</span>}
                </h2>
              </Link>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              {p.description && <p>{p.description}</p>}
              {p.tags.length > 0 && (
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">#{t}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
