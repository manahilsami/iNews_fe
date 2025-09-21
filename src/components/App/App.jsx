import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getNews } from "../../utils/newsApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
// import About from "../About/About";
import Footer from "../Footer/Footer";
// import Preloader from "../Preloader/Preloader";
// import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";
import "./App.css";
import { set } from "mongoose";
import { signin, checkToken } from "../../utils/auth";
import { saveArticle, deleteArticle } from "../../utils/api";

function App() {
  const handleBookmarkToggle = (cardLink) => {
    const token = localStorage.getItem("jwt");
    return deleteArticle(cardLink, token)
      .then((res) => {
        // You can add any additional logic here, e.g., update state or show notification
        console.log("Deleted article with link:", cardLink);
        return res;
      })
      .catch((err) => {
        // Handle error (e.g., show error message)
        console.error("Failed to delete article:", err);
        throw err;
      });
  };
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // false by default to keep modal closed when app loads
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // false by default to keep modal closed when app loads
  // dummy state for loading and search results
  // later, these will be set based on API calls and user interactions */
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // User state: null if not signed in, object if signed in
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to save an article using the API
  const handleSaveArticle = (article, token) => {
    // Add keyword to article before saving
    const articleWithKeyword = { ...article, keyword: searchKeyword };
    return saveArticle(articleWithKeyword, token)
      .then((savedArticle) => {
        // You can add any additional logic here, e.g., update state or show notification
        return savedArticle;
      })
      .catch((err) => {
        // Handle error (e.g., show error message)
        console.error("Failed to save article:", err);
        throw err;
      });
  };
  // helper functions to open/close the login modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Dummy login handler - replace with real logic
  const handleLoginSubmit = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject("No token received");
      })
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        handleCloseLoginModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };
  // Dummy register handler - replace with real logic
  const handleRegisterSubmit = (data) => {
    setUser({ name: data.name || "User" });
    setIsRegisterModalOpen(false);
  };

  //switch models
  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // // Dummy register click handler - will open register modal on click
  // const handleRegisterClick = () => {
  //   // handle register logic here
  //   setIsRegisterModalOpen(false);
  // };

  // const handleLoginClick = () => {
  //   //handle login logic here
  //   setIsRegisterModalOpen(false);
  // };

  const handleSearch = (keyword) => {
    setIsLoading(true); // this will show the preloader
    setHasSearched(true);
    setSearchKeyword(keyword);
    getNews(keyword) // frontend API function that calls the newsAPI
      .then((articles) => {
        setSearchResults(articles); // stores the fetched articles in local state
      })
      .catch((err) => {
        console.error(err);
        setSearchResults([]); // if there's an error, results are cleared, hence the empty array
      })
      .finally(() => {
        setIsLoading(false); // this hides the preloader when articles appear or error occurs
      });
  };

  return (
    <div>
      <section className="hero">
        <Header onSignInClick={handleOpenLoginModal} user={user} />
        <SearchForm onSearch={handleSearch} />
      </section>
      {!isLoading && searchResults.length > 0 && (
        <NewsCardList
          cards={searchResults}
          onSave={handleSaveArticle}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoading={isLoading}
                searchResults={searchResults}
                hasSearched={hasSearched}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews user={user} />} />
        </Routes>
      </div>

      <Footer />
      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLoginSubmit={handleLoginSubmit}
        onRegisterClick={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onRegisterSubmit={handleRegisterSubmit}
        onLoginClick={handleSwitchToLogin}
      />
    </div>
  );
}

export default App;
