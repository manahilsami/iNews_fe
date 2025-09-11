import React, { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import LoginModal from "../LoginModal/LoginModal";
import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // false by default to keep modal closed when app loads

  // helper functions to open/close the login modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

  // Dummy login handler - will close modal on submit
  const handleLoginSubmit = (data) => {
    // handle login logic here
    setIsLoginModalOpen(false);
  };

  // Dummy register click handler - will open register modal on click
  const handleRegisterClick = () => {
    // handle register logic here
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      <section className="hero">
        <Header onSignInClick={handleOpenLoginModal} />
        <SearchForm />
      </section>
      <Preloader />
      <NewsCardList />
      <About />
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLoginSubmit={handleLoginSubmit}
        onRegisterClick={handleRegisterClick}
      />
    </div>
  );
}

export default App;
