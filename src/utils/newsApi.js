import { checkResponse } from "./api.js";

function getNews(keyword) {
  if (!keyword) {
    return Promise.reject("Please enter a keyword");
  }

  const to = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
  console.log(from, to);

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
