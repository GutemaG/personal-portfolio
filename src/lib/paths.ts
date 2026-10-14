// Prefixes a file in public/ with the site's base path, for plain <a> and <img> tags.
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${path.replace(/^\//, "")}`;
}
