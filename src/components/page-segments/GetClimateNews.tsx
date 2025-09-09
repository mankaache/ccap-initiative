// lib/getClimateNews.ts
export async function getClimateNews() {
  const API_KEY = process.env.NEWS_API_KEY; 
  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=climate&language=fr`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch climate news");
  const data = await res.json();

  return data.results.map((article: any, index: number) => ({
    id: article.article_id || index,
    title: article.title,
    date: article.pubDate,
    image: article.image_url,
    category: "international",
    source: article.source_id,
    description: article.description,
    content: article.content || article.description,
  }));
}
