import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./App.css";

function App() {
  return (
    <div>
      <section className="hero">
        <Header />
        <SearchForm />
      </section>
    </div>
  );
}

export default App;
