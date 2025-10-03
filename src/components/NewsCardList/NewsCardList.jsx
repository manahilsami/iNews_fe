import { useState } from "react";
import PropTypes from "prop-types";
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
      <ul className="news-card-list__grid" role="list">
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
      </ul>
      {!isSavedSection && visibleCount < cards.length && (
        <button className="news-card-list__show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;

NewsCardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      link: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      keyword: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      source: PropTypes.string,
    })
  ).isRequired,
  isSavedSection: PropTypes.bool,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onBookmarkToggle: PropTypes.func,
};

NewsCardList.defaultProps = {
  isSavedSection: false,
  onDelete: undefined,
  onSave: undefined,
  onBookmarkToggle: undefined,
};
