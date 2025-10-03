import "./Main.css";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import notfound from "../../images/not-found_v1.svg";
import PropTypes from "prop-types";

function Main({ isLoading, searchResults, hasSearched }) {
  return (
    <main className="main">
      {isLoading && <Preloader />}
      {!isLoading && hasSearched && searchResults.length === 0 && (
        <div className="main__no-results">
          <img
            className="main__no-results-icon"
            src={notfound}
            alt="Not Found Icon"
          />
          <h2 className="main__no-results-title">Nothing found</h2>
          <p className="main__no-results-subtitle">
            Sorry, but nothing matched your terms.
          </p>
        </div>
      )}
      <About />
    </main>
  );
}

export default Main;

Main.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSearched: PropTypes.bool.isRequired,
};
