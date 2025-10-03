import { useState } from "react";
import PropTypes from "prop-types";
import "./NewsCard.css";

function NewsCard({
  card,
  isSavedSection,
  onDelete,
  onSave,
  onBookmarkToggle,
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem("jwt");

  const handleBookmarkClick = () => {
    setBookmarked((prev) => {
      const newState = !prev;
      if (!isSavedSection && typeof onSave === "function" && newState) {
        onSave(card, token);
      }
      if (!newState && typeof onBookmarkToggle === "function") {
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
      setIsDeleting(true);
      Promise.resolve(onDelete(card._id)).finally(() => {
        setIsDeleting(false);
      });
    }
  };

  return (
    <li className="news-card" role="listitem">
      <img
        className="news-card__image"
        src={card?.image || "https://via.placeholder.com/400x272"}
        alt={card?.title || "Article Image"}
      />
      {isSavedSection && card?.keyword ? (
        <div
          className="news-card__keyword"
          aria-label={`Keyword: ${card.keyword}`}
          title={card.keyword}
        >
          {typeof card.keyword === "string" && card.keyword.length
            ? card.keyword.charAt(0).toUpperCase() + card.keyword.slice(1)
            : card.keyword}
        </div>
      ) : null}
      {isSavedSection ? (
        <button
          className="news-card__trash"
          onClick={handleDeleteClick}
          aria-label="Delete saved article"
          disabled={isDeleting}
        >
          {isDeleting ? <span className="news-card__trash-spinner" /> : null}
        </button>
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
    </li>
  );
}

export default NewsCard;

NewsCard.propTypes = {
  card: PropTypes.exact({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    keyword: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  isSavedSection: PropTypes.bool,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onBookmarkToggle: PropTypes.func,
};

NewsCard.defaultProps = {
  isSavedSection: false,
  onDelete: undefined,
  onSave: undefined,
  onBookmarkToggle: undefined,
};
