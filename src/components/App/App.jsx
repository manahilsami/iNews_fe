import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // false by default to keep modal closed when app loads
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // false by default to keep modal closed when app loads

  // dummy state for loading and search results
  // later, these will be set based on API calls and user interactions
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // helper functions to open/close the login modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Dummy login handler - will close modal on submit
  const handleLoginSubmit = (data) => {
    // handle login logic here
    setIsLoginModalOpen(false);
  };

  //dummy register handler - will close modal on submit
  const handleRegisterSubmit = (data) => {
    // handle register logic here
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

  return (
    <div>
      <section className="hero">
        <Header onSignInClick={handleOpenLoginModal} />
        <SearchForm />
      </section>

      <Routes>
        <Route
          path="/"
          element={<Main isLoading={isLoading} searchResults={searchResults} />}
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>

      {/* <Main isLoading={isLoading} searchResults={searchResults} /> */}

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
