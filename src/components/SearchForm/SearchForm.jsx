import "./SearchForm.css";
import { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword) return;
    onSearch(keyword);
  };

  return (
    <div className="searchform">
      <p className="searchform__title">What&apos;s going on in the world?</p>
      <p className="searchform__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="searchform__searchbar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter topic"
          className="searchform__searchbar-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <button type="submit" className="searchform__searchbar-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
