import React, { useState, useEffect } from "react";
import QuoteList from "../components/QuoteList";
import TopicsBar from "../components/TopicsBar";
import "../style/home.scss";

const Home = () => {
  const partitions = [];
  const [topics, setTopics] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&with_topics=true&page=1&size=30"
    )
      .then((res) => res.json())
      .then(({ categories, quotes }) => {
        setTopics(categories);
        setQuotes(quotes);
      });
  }, []);

  if (quotes.length > 0) {
    const partitionLength = Math.ceil(quotes.length / 3);

    for (let i = 0; i < quotes.length; i += partitionLength) {
      const partition = quotes.slice(i, i + partitionLength);
      partitions.push(partition);
    }
  }

  return (
    <div className="container">
      <TopicsBar topics={topics} />
      <div className="main-container">
        {partitions.map((partition, index) => (
          <QuoteList quotes={partition} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
