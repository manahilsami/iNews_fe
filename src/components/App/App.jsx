import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getNews } from "../../utils/newsApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
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

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // false by default to keep modal closed when app loads
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // false by default to keep modal closed when app loads
  // dummy state for loading and search results
  // later, these will be set based on API calls and user interactions */
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  // User state: null if not signed in, object if signed in
  const [user, setUser] = useState(null);

  // helper functions to open/close the login modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Dummy login handler - replace with real logic
  const handleLoginSubmit = (data) => {
    // Example: set user state with name from login form
    setUser({ name: data.name || "User" });
    setIsLoginModalOpen(false);
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
