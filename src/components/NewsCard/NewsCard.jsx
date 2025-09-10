import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({ card }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="news-card">
      <img
        className="news-card__image"
        src={card?.image || "https://via.placeholder.com/400x272"}
        alt={card?.title || "Article Image"}
      />
      {bookmarked ? (
        <button
          className="news-card__bookmark-colored"
          onClick={handleBookmarkClick}
          aria-label="Remove bookmark"
        ></button>
      ) : (
        <button
          className="news-card__bookmark"
          onClick={handleBookmarkClick}
          aria-label="Add bookmark"
        ></button>
      )}
      <div className="news-card__content">
        <p className="news-card__date">{card?.date || "Date"}</p>
        <h2 className="news-card__title">{card?.title || "News Title"}</h2>
        <p className="news-card__description">
          {card?.description || "News description goes here."}
        </p>
        <p className="news-card__source">{card?.source || "News Source"}</p>
      </div>
    </div>
  );
}

export default NewsCard;
