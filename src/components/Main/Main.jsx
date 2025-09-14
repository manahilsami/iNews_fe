import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";

function Main({ isLoading, searchResults }) {
  return (
    <main className="main">
      {/* loader */}
      {isLoading && <Preloader />} {/* shows preloader while data is loading */}
      {/* stops loading & shows search results if they exist */}
      {!isLoading && searchResults.length > 0 && (
        <NewsCardList cards={searchResults} />
      )}
      {/* loading stops and shows msg if no results found */}
      {!isLoading && searchResults.length === 0 && (
        <div className="main__no-results">
          <h2 className="main__no-results-title">Nothing found</h2>
          <p className="main__no-results-text">
            Sorry, but nothing matched your terms.
          </p>
        </div>
      )}
      <About />
    </main>
  );
}

export default Main;
