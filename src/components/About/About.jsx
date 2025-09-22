import "./About.css";
import React from "react";
import manahil from "../../images/manahil.png";

function About() {
  return (
    <div className="about">
      <div className="about__left">
        <img src={manahil} alt="Author Image" className="about__left-image" />
      </div>
      <div className="about__right">
        <p className="about__right-title">About the author</p>
        <p className="about__right-description">
          Hi, my name is Manahil Sami, and I’m an aspiring software engineer
          passionate about building impactful applications. I completed the
          Software Engineering program at TripleTen, where I gained hands-on
          experience with both front-end and back-end development.
        </p>

        <p className="about__right-description">
          My skills include HTML, CSS, JavaScript, React.js, Node.js,
          Express.js, MongoDB, Python, APIs, Google Cloud Platform (GCP), NoSQL
          and relational databases, system design, Agile practices, and
          object-oriented programming (OOP). Through several projects, I’ve
          learned how to take an idea from concept to a fully functioning
          application.
        </p>

        <p className="about__right-description">
          I’m excited to help potential customers by creating custom
          applications that combine a polished, user-friendly frontend with a
          robust backend — whether for personal use or to support their business
          needs.
        </p>
      </div>
    </div>
  );
}

export default About;
