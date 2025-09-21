import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  card,
  isSavedSection,
  onDelete,
  onSave,
  onBookmarkToggle,
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Accept onSave as a prop
  const token = localStorage.getItem("jwt");
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked((prev) => {
      const newState = !prev;
      if (!isSavedSection && typeof onSave === "function" && newState) {
        onSave(card, token);
      }
      // If unchecking, call onBookmarkToggle with card id and disable button
      if (!newState && typeof onBookmarkToggle === "function") {
        setSelectedCardId(card._id || card.id || card.link);
        setIsDeleting(true);
        Promise.resolve(
          onBookmarkToggle(card._id || card.id || card.link)
        ).finally(() => {
          setIsDeleting(false);
        });
      }
      return newState;
    });
  };

  const handleDeleteClick = () => {
    if (onDelete && card._id) {
      onDelete(card._id);
    }
  };

  return (
    <div className="news-card">
      <img
        className="news-card__image"
        src={card?.image || "https://via.placeholder.com/400x272"}
        alt={card?.title || "Article Image"}
      />
      {isSavedSection ? (
        <button
          className={`news-card__trash${
            isTrashHovered ? "news-card__trash--active" : ""
          }`}
          onClick={handleDeleteClick}
          onMouseEnter={() => setIsTrashHovered(true)}
          onMouseLeave={() => setIsTrashHovered(false)}
          aria-label="Delete saved article"
        ></button>
      ) : bookmarked ? (
        <button
          className="news-card__bookmark-colored"
          onClick={handleBookmarkClick}
          aria-label="Remove bookmark"
          disabled={isDeleting}
        ></button>
      ) : (
        <button
          className="news-card__bookmark"
          onClick={handleBookmarkClick}
          aria-label="Add bookmark"
          disabled={isDeleting}
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
