import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import PropTypes from "prop-types";

function SavedNews({ user, articles, onDelete }) {
  const keywords = [...new Set(articles.map((a) => a.keyword).filter(Boolean))];

  const capitalizeFirst = (s) =>
    typeof s === "string" && s.length
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;
  const displayKeywords = keywords.map(capitalizeFirst);

  return (
    <div className="saved-news">
      <p className="saved-news__title">Saved articles</p>
      <h1 className="saved-news__message">
        {user?.username || user?.name}, you have {articles.length} saved
        articles
      </h1>
      <p className="saved-news__keywords">
        <span className="saved-news__keywords-label">By keywords: </span>
        <span className="saved-news__keywords-list">
          {displayKeywords.length > 0 ? displayKeywords.join(", ") : "None"}
        </span>
      </p>
      <NewsCardList cards={articles} isSavedSection onDelete={onDelete} />
    </div>
  );
}

export default SavedNews;

SavedNews.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      _id: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ]),
  articles: PropTypes.arrayOf(
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
  onDelete: PropTypes.func.isRequired,
};

SavedNews.defaultProps = {
  user: null,
};
