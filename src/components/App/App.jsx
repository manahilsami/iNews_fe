import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import "./App.css";

function App() {
  return (
    <div>
      <section className="hero">
        <Header />
        <SearchForm />
      </section>
      <Preloader />
      <About />
      <Footer />
    </div>
  );
}

export default App;
