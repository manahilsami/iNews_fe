import { checkResponse } from "./api.js";

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

function getNews(keyword) {
  if (!keyword) {
    return Promise.reject("Please enter a keyword");
  }

  const to = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const params = new URLSearchParams({
    q: keyword,
    apiKey,
    from,
    to,
    pageSize: "100",
  });

  return fetch(`${newsApiBaseUrl}?${params.toString()}`)
    .then(checkResponse)
    .then((data) => {
      console.log("Raw API response:", data);
      return data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        source: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        link: article.url,
      }));
    });
}

export { getNews };
