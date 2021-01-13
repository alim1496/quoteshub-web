import React, { useState, useEffect } from "react";
import QuoteList from "../components/QuoteList";
import TopicsBar from "../components/TopicsBar";
import "../style/home.scss";

const Home = () => {
  let arrayFirstHalf, arraySecondHalf;
  const [topics, setTopics] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?with_topics=true&page=1&size=20"
    )
      .then((res) => res.json())
      .then(({ categories, quotes }) => {
        setTopics(categories);
        setQuotes(quotes);
      });
  }, []);

  if (quotes.length > 0) {
    let halfwayThrough = Math.ceil(quotes.length / 2);
    arrayFirstHalf = quotes.slice(0, halfwayThrough);
    arraySecondHalf = quotes.slice(halfwayThrough, quotes.length);
  }

  return (
    <div className="container">
      <TopicsBar topics={topics} />
      <div className="main-container">
        <QuoteList quotes={arrayFirstHalf} />
        <QuoteList quotes={arraySecondHalf} />
      </div>
    </div>
  );
};

export default Home;
