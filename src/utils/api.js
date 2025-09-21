const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrms.jumpingcrab.com"
    : "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Try to parse error body for message; fall back to status text
  return res
    .json()
    .catch(() => ({ message: res.statusText }))
    .then((body) => {
      const err = new Error(
        body?.message || res.statusText || "Request failed"
      );
      err.status = res.status;
      err.body = body;
      throw err;
    });
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
    method: "GET",
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
