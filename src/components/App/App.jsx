import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { getNews } from "../../utils/newsApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";

import Footer from "../Footer/Footer";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";
import Main from "../Main/Main";
import "./App.css";
import { signup, signin, checkToken } from "../../utils/auth";
import { saveArticle, deleteArticle, getSavedArticles } from "../../utils/api";

function App() {
  const navigate = useNavigate();
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
  const [isRegisterSuccessOpen, setIsRegisterSuccessOpen] = useState(false);
  const { pathname } = useLocation();
  const isSavedNewsRoute = pathname === "/saved-news";
  const [savedArticles, setSavedArticles] = useState([]);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => {
    setRegisterError("");
    setIsRegisterModalOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    checkToken(token)
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        return fetchSavedArticles();
      })
      .then(setSavedArticles)
      .catch((err) => {
        console.warn("Session restore failed:", err);
        setIsLoggedIn(false);
        setUser(null);
        setSavedArticles([]);
      });
  }, []);
  const handleCloseRegisterModal = () => {
    setRegisterError("");
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("jwt");
    } catch (_) {}
    setUser(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
    navigate("/", { replace: true });
  };

  const handleRegisterSubmit = ({ email, password, username }) => {
    setRegisterError("");
    signup({ email, password, username })
      .then(() => {
        handleCloseRegisterModal();
        setIsRegisterSuccessOpen(true);
      })
      .catch((err) => {
        if (err?.status === 409) {
          setRegisterError("This email is not available");
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
  const fetchSavedArticles = () => {
    const token = localStorage.getItem("jwt");
    return getSavedArticles(token)
      .then((articles) => {
        console.log("Fetched saved articles:", articles);
        return articles;
      })
      .catch((err) => {
        console.error("Failed to fetch saved articles:", err);
        throw err;
      });
  };
  const handleBookmarkToggle = (cardLink) => {
    const token = localStorage.getItem("jwt");
    const matchedSaved = savedArticles.find(
      (a) => a._id === cardLink || a.id === cardLink || a.link === cardLink
    );
    const idToDelete = matchedSaved?._id || cardLink;
    return deleteArticle(idToDelete, token)
      .then((res) => {
        return fetchSavedArticles()
          .then((articles) => {
            setSavedArticles(articles);
            console.log("Deleted article:", idToDelete);
            return res;
          })
          .catch((err) => {
            console.error(
              "Failed to refresh saved articles after delete:",
              err
            );
            return res;
          });
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
        throw err;
      });
  };

  const handleSaveArticle = (article, token) => {
    const articleWithKeyword = { ...article, keyword: searchKeyword };
    return saveArticle(articleWithKeyword, token)
      .then((savedArticle) => {
        return fetchSavedArticles()
          .then((articles) => {
            setSavedArticles(articles);
            return savedArticle;
          })
          .catch((err) => {
            console.error("Failed to refresh saved articles after save:", err);
            return savedArticle;
          });
      })
      .catch((err) => {
        console.error("Failed to save article:", err);
        throw err;
      });
  };

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
        fetchSavedArticles()
          .then(setSavedArticles)
          .catch(() => setSavedArticles([]));
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchKeyword(keyword);
    getNews(keyword)
      .then((articles) => {
        setSearchResults(articles);
      })
      .catch((err) => {
        console.error(err);
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <section className={isSavedNewsRoute ? "" : "hero"}>
        <Header
          onSignInClick={handleOpenLoginModal}
          user={user}
          onLogout={handleLogout}
          isSaved={isSavedNewsRoute}
        />
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
      <RegisterSuccessModal
        isOpen={isRegisterSuccessOpen}
        onClose={() => setIsRegisterSuccessOpen(false)}
        onSignIn={() => {
          setIsRegisterSuccessOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;
