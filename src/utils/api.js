const baseUrl =
  import.meta.env.MODE === "production" || import.meta.env.PROD
    ? "https://api.newsexplorer.fpr.net"
    : "http://localhost:3002";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
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
