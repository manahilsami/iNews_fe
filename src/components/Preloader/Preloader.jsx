import "./Preloader.css";
import React from "react";

function Preloader() {
  return (
    <div className="circle-preloader">
      <div className="circle-preloader__circle"></div>
      <p className="circle-preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
