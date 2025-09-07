import "./SearchForm.css";
import React from "react";

function SearchForm() {
  return (
    <div className="searchform">
      <p className="searchform__title">What's going on in the world?</p>
      <p className="searchform__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="searchform__searchbar">
        <input
          type="text"
          placeholder="Enter topic"
          className="searchform__searchbar-input"
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
