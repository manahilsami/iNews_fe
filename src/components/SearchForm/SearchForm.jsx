import "./SearchForm.css";
import React, { useState } from "react";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword) {
      setError("Please enter a keyword"); // if keyword is empty, error shows
      return;
    }
    setError("");
    onSearch(keyword);
  };

  return (
    <div className="searchform">
      <p className="searchform__title">What's going on in the world?</p>
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
      {/* {error && <p className="searchform__error">{error}</p>} */}
    </div>
  );
}

export default SearchForm;
