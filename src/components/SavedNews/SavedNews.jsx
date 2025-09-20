import React, { useEffect, useState } from "react";
import "./SavedNews.css";
import { getSavedArticles, deleteArticle } from "../../utils/api";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ user }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      getSavedArticles(user.token)
        .then((data) => {
          setArticles(data);
        })
        .catch((err) => {
          setArticles([]);
        });
    }
  }, [user]);

  // Collect unique keywords from articles
  const keywords = [...new Set(articles.map((a) => a.keyword).filter(Boolean))];

  const handleDelete = async (articleId) => {
    if (!user?.token) return;
    try {
      await deleteArticle(articleId, user.token);
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <div className="saved-news">
      <h1 className="saved-news__title">
        {user.name}, you have {articles.length} saved articles
      </h1>
      <p className="saved-news__keywords">
        By keywords: {keywords.length > 0 ? keywords.join(", ") : "None"}
      </p>
      <NewsCardList cards={articles} isSavedSection onDelete={handleDelete} />
    </div>
  );
}

export default SavedNews;
