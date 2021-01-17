import React, { useState, useEffect, useRef, Fragment } from "react";
import Footer from "../components/Footer";
import QuoteList from "../components/QuoteList";
import TopicsBar from "../components/TopicsBar";
import "../style/home.scss";

const Home = ({ location, match }) => {
  const partitions = [];
  const [topics, setTopics] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = location;

  useEffect(() => {
    checkPath(pathname);
  }, [pathname]);

  const checkPath = async (path) => {
    await setQuotes([]);
    setLoading(true);
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
      .then(
        (result) => {
          setQuotes(result);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const fetchHome = () => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&with_topics=true&page=1&size=30"
    )
      .then((res) => res.json())
      .then(
        ({ categories, quotes }) => {
          setTopics(categories);
          setQuotes(quotes);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
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
      {loading && <div className="main-loader">Loading...</div>}
      {!loading && (
        <Fragment>
          <div className="main-container">
            {partitions.map((partition, index) => (
              <QuoteList quotes={partition} key={index} />
            ))}
          </div>
          <Footer />
        </Fragment>
      )}
    </div>
  );
};

export default Home;
