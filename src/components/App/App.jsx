import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { signup, signin, checkToken } from "../../utils/auth";
import { saveArticle, deleteArticle, getSavedArticles } from "../../utils/api";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const { pathname } = useLocation();
  const isSavedNewsRoute = pathname === "/saved-news";
  const [savedArticles, setSavedArticles] = useState([]);
  // helper functions to open/close the login modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Logout clears token and user-related state
  const handleLogout = () => {
    try {
      localStorage.removeItem("jwt");
    } catch (_) {}
    setUser(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  const handleRegisterSubmit = ({ email, password, username }) => {
    setRegisterError("");
    // Send both name and username for maximum compatibility; backend accepts either
    signup({ email, password, username })
      .then(() => signin({ email, password }))
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject(new Error("No token received"));
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseRegisterModal();
      })
      .catch((err) => {
        if (err?.status === 409) {
          setRegisterError(
            "A user with this email already exists. Try signing in instead."
          );
        } else {
          setRegisterError(
            err?.message || "Registration failed. Please try again."
          );
        }
        console.error("Registration/Login failed:", err);
      });
  };

  const handleDeleteSavedArticle = (articleId) => {
    const token = localStorage.getItem("jwt");
    return deleteArticle(articleId, token)
      .then(() => {
        return fetchSavedArticles().then(setSavedArticles);
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
        throw err;
      });
  };
  // Function to fetch saved articles for the user
  const fetchSavedArticles = () => {
    const token = localStorage.getItem("jwt");
    return getSavedArticles(token)
      .then((articles) => {
        // You can add any additional logic here, e.g., update state or show notification
        console.log("Fetched saved articles:", articles);
        return articles;
      })
      .catch((err) => {
        // Handle error (e.g., show error message)
        console.error("Failed to fetch saved articles:", err);
        throw err;
      });
  };
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
        console.log("Logged in user data:", userData);
        setUser(userData);
        setIsLoggedIn(true);
        handleCloseLoginModal();
        // Fetch saved articles after login
        fetchSavedArticles()
          .then(setSavedArticles)
          .catch(() => setSavedArticles([]));
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };
  // // Dummy register handler - replace with real logic
  // const handleRegisterSubmit = (data) => {
  //   setUser({ name: data.name });
  //   setIsRegisterModalOpen(false);
  // };

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
        <Header onSignInClick={handleOpenLoginModal} user={user} onLogout={handleLogout} />
        {!isSavedNewsRoute && <SearchForm onSearch={handleSearch} />}
      </section>
      {!isSavedNewsRoute && !isLoading && searchResults.length > 0 && (
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
          <Route
            path="/saved-news"
            element={
              <SavedNews
                user={user}
                articles={savedArticles}
                onDelete={handleDeleteSavedArticle}
              />
            }
          />
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
        errorMessage={registerError}
      />
    </div>
  );
}

export default App;
