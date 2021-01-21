import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";

import QuoteList from "../components/QuoteList";
import "../style/home.scss";
import ErrorState from "../components/ErrorState";
import { TopicContext, useTopic } from "../context/TabContextController";

const Home = ({ location, match }) => {
  const partitions = [];
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const topic = useTopic();
  const { pathname } = location;
  const [title, setTitle] = useState("");

  useEffect(() => {
    checkPath(pathname);
  }, [pathname]);

  const checkPath = async (path) => {
    await setQuotes([]);
    setLoading(true);
    if (path.includes("category")) {
      const { id, name } = match.params;
      fetchCategory(id);
      topic.updateTab(id);
      setTitle(`${name[0].toUpperCase() + name.substring(1)} Quotes`);
    } else if (path.includes("quotes")) {
      const { id, name } = match.params;
      fetchAuthorQuotes(id);
      setTitle(`${name} Quotes`);
    } else {
      fetchHome();
      topic.updateTab(-1);
      setTitle("Featured Quotes");
    }
  };

  const fetchAuthorQuotes = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/source/${id}/quotes/?page=1&size=30`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setQuotes(result);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      );
  };

  const fetchCategory = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/category/${id}/?page=1&size=30`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setQuotes(result);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      );
  };

  const fetchHome = () => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&page=1&size=30"
    )
      .then((res) => res.json())
      .then(
        ({ quotes }) => {
          setQuotes(quotes);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
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

  if (loading) {
    return (
      <div className="loader-container">
        <div className="main-loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        msg="something went wrong"
        tryAgain={true}
        tryMsg="try again"
        onTryClick={() => checkPath(pathname)}
      />
    );
  }

  return (
    <div className="main-container">
      <h2 className="top-title">{title}</h2>
      <div className="container-quotes">
        {partitions.map((partition, index) => (
          <QuoteList quotes={partition} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
