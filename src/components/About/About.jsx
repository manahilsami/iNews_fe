import "./About.css";
import React from "react";

function About() {
  return (
    <div className="about">
      <div className="about__left">
        <img
          src="https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Author Image"
          className="about__left-image"
        />
      </div>
      <div className="about__right">
        <p className="about__right-title">About the author</p>
        <p className="about__right-description">
          Add description of yourself, what you do and what technologies you
          know.
        </p>
      </div>
    </div>
  );
}

export default About;
