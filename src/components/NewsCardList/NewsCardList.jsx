import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  cards,
  isSavedSection,
  onDelete,
  onSave,
  onBookmarkToggle,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, cards.length));
  };
  if (!cards || cards.length === 0) return null;

  return (
    <div
      className={`news-card-list${
        isSavedSection ? " news-card-list--saved" : ""
      }`}
    >
      {!isSavedSection && (
        <p className="news-card-list__title">Search results</p>
      )}
      <div className="news-card-list__grid">
        {(isSavedSection ? cards : cards.slice(0, visibleCount)).map((card) => (
          <NewsCard
            key={card._id || card.link}
            card={card}
            isSavedSection={isSavedSection}
            onDelete={onDelete}
            onSave={onSave}
            onBookmarkToggle={onBookmarkToggle}
          />
        ))}
      </div>
      {!isSavedSection && visibleCount < cards.length && (
        <button className="news-card-list__show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
