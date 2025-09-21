import React, { useEffect, useState } from "react";
import "./SavedNews.css";
import { getSavedArticles, deleteArticle } from "../../utils/api";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ user, articles, onDelete }) {
  // Collect unique keywords from articles
  const keywords = [...new Set(articles.map((a) => a.keyword).filter(Boolean))];

  return (
    <div className="saved-news">
      <p>Saved articles</p>
      <h1 className="saved-news__title">
        {user?.name}, you have {articles.length} saved articles
      </h1>
      <p className="saved-news__keywords">
        By keywords: {keywords.length > 0 ? keywords.join(", ") : "None"}
      </p>
      <NewsCardList cards={articles} isSavedSection onDelete={onDelete} />
    </div>
  );
}

export default SavedNews;
