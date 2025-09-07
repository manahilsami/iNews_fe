import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import "./App.css";

function App() {
  return (
    <div>
      <section className="hero">
        <Header />
        <SearchForm />
      </section>
      <About />
    </div>
  );
}

export default App;
