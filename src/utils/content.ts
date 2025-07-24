import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getAllSeries() {
  // ... igual que antes
}

export async function getSeriesBySlug(slug: string) {
  // ... igual que antes
}

export async function getArticlesBySeries(slug: string) {
  const dir = path.resolve("./src/pages/series", slug);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
  const articles = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    data.link = `/series/${slug}/${file.replace(/\.md$/, "")}`;
    articles.push(data);
  }
  // Ordena artículos por fecha descendente
  articles.sort((a, b) => b.date.localeCompare(a.date));
  return articles;
}

export async function getAllTags() {
  const seriesRoot = path.resolve("./src/pages/series");
  const folders = fs.readdirSync(seriesRoot).filter(f => fs.statSync(path.join(seriesRoot, f)).isDirectory());
  const tagSet = new Set();
  for (const folder of folders) {
    const articles = await getArticlesBySeries(folder);
    for (const art of articles) {
      (art.tags || []).forEach(tag => tagSet.add(tag));
    }
  }
  return Array.from(tagSet).sort();
}

// Paginación simple
export function paginate(items, pageSize, page = 1) {
  const total = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page
  };
}