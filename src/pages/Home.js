import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import QuoteList from "../components/QuoteList";
import TopicsBar from "../components/TopicsBar";
import "../style/home.scss";

const Home = ({ location, match }) => {
  const partitions = [];
  const [topics, setTopics] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const { pathname } = location;

  useEffect(() => {
    checkPath(pathname);
  }, [pathname]);

  const checkPath = (path) => {
    if (path.includes("category")) {
      const { id, name } = match.params;
      fetchCategory(id);
    } else {
      fetchHome();
    }
  };

  const fetchCategory = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/category/${id}?page=1&size=30`
    )
      .then((res) => res.json())
      .then((result) => {
        setQuotes(result);
      }, (error) => {
        console.log(error);
      });
  };

  const fetchHome = () => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&with_topics=true&page=1&size=30"
    )
      .then((res) => res.json())
      .then(({ categories, quotes }) => {
        setTopics(categories);
        setQuotes(quotes);
      }, (error) => {
        console.log(error);
      });
  };

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
      <Footer />
    </div>
  );
};

export default Home;
