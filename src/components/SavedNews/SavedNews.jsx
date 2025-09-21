import React, { useEffect, useState } from "react";
import "./SavedNews.css";
import { getSavedArticles, deleteArticle } from "../../utils/api";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ user, articles, onDelete }) {
  // Collect unique keywords from articles
  const keywords = [...new Set(articles.map((a) => a.keyword).filter(Boolean))];

  return (
    <div className="saved-news">
      <p className="saved-news__title">Saved articles</p>
      <h1 className="saved-news__message">
        {user?.name}, you have {articles.length} saved articles
      </h1>
      <p className="saved-news__keywords">
        <span className="saved-news__keywords-label">By keywords: </span>
        <span className="saved-news__keywords-list">
          {keywords.length > 0 ? keywords.join(", ") : "None"}
        </span>
      </p>
      <NewsCardList cards={articles} isSavedSection onDelete={onDelete} />
    </div>
  );
}

export default SavedNews;
