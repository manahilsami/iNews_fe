import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";

function Main({ isLoading, searchResults }) {
  return (
    <main>
      <section className="hero">
        <SearchForm />
      </section>
      // show loader while fetching data
      {isLoading && <Preloader />}
      // only shows results if they exist
      {searchResults.length > 0 && <NewsCardList cards={searchResults} />}
      <About />
    </main>
  );
}

export default Main;
