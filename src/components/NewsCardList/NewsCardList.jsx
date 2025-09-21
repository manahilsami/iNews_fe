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
  // const [cards] = useState([
  //   {
  //     id: 1,
  //     title: "Sample News 1",
  //     description: "This is a description for news 1.",
  //     image: "https://via.placeholder.com/400x272",
  //     date: "2025-09-09",
  //     source: "Source 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Sample News 2",
  //     description: "This is a description for news 2.",
  //     image: "https://via.placeholder.com/400x272",
  //     date: "2025-09-08",
  //     source: "Source 2",
  //   },
  //   {
  //     id: 3,
  //     title: "Sample News 3",
  //     description: "This is a description for news 3.",
  //     image: "https://via.placeholder.com/400x272",
  //     date: "2025-09-07",
  //     source: "Source 3",
  //   },
  //   {
  //     id: 4,
  //     title: "Sample News 4",
  //     description: "This is a description for news 4.",
  //     image: "https://via.placeholder.com/400x272",
  //     date: "2025-09-06",
  //     source: "Source 4",
  //   },
  //   {
  //     id: 5,
  //     title: "Sample News 5",
  //     description: "This is a description for news 5.",
  //     image: "https://via.placeholder.com/400x272",
  //     date: "2025-09-05",
  //     source: "Source 5",
  //   },
  // ]);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, cards.length));
  };
  if (!cards || cards.length === 0) return null; // nothing to render

  return (
    <div
      className={`news-card-list${
        isSavedSection ? " news-card-list--saved" : ""
      }`}
    >
      {!isSavedSection && (
        <p className="news-card-list__title">Search Results</p>
      )}
      {/* {console.log("Cards passed to NewsCardList:", cards)} */}
      <div className="news-card-list__grid">
        {cards.slice(0, visibleCount).map((card) => (
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
      {visibleCount < cards.length && (
        <button className="news-card-list__show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
