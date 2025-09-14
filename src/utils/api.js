const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error:${res.setatus}`);
}

function saveArticle(article, token) {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

function getSavedArticles(token) {
  return fetch(`${baseUrl}/articles`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function deleteArticle(articleId, token) {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { getSavedArticles, saveArticle, deleteArticle, checkResponse };
