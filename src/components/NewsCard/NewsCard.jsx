import React from "react";
import "./NewsCard.css";

function NewsCard() {
  return (
    <div className="news-card">
      <img className="news-card__image" src="" alt="Article Image" />
      <button className="news-card__bookmark"></button>
      <button className="news-card__bookmark-colored"></button>
      <div className="news-card__content">
        <p className="news-card__date">Date</p>
        <h2 className="news-card__title">News Title</h2>
        <p className="news-card__description">News description goes here.</p>
        <p className="news-card__source">News Source</p>
      </div>
    </div>
  );
}

export default NewsCard;
