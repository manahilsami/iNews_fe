import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList() {
  return (
    <div className="news-card-list">
      {cards.map((card) => (
        <NewsCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default NewsCardList;
