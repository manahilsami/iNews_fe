import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";


function NewsCardList() {
  // Hard-coded array of news card objects
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Sample News 1",
      description: "This is a description for news 1.",
      image: "https://via.placeholder.com/400x272",
      date: "2025-09-09",
      source: "Source 1"
    },
    {
      id: 2,
      title: "Sample News 2",
      description: "This is a description for news 2.",
      image: "https://via.placeholder.com/400x272",
      date: "2025-09-08",
      source: "Source 2"
    }
    // Add more sample cards as needed
  ]);

  return (
    <div className="news-card-list">
      {cards.map((card) => (
        <NewsCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default NewsCardList;
