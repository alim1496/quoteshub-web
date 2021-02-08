import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { useHistory } from "react-router-dom";
import QuoteList from "../components/QuoteList";
import "../style/home.scss";
import ErrorState from "../components/ErrorState";
import { TopicContext, useTopic } from "../context/TabContextController";

const Home = ({ location, match }) => {
  const [quotes1, setQuotes1] = useState([]);
  const [quotes2, setQuotes2] = useState([]);
  const [quotes3, setQuotes3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const topic = useTopic();
  const { pathname } = location;
  const [title, setTitle] = useState("");
  let page = 1;
  let blocked = false;
  let noMore = false;

  useEffect(() => {
    checkPath();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const checkPath = async () => {
    await setQuotes1([]);
    await setQuotes2([]);
    await setQuotes3([]);
    setLoading(true);
    noMore = false;
    blocked = false;
    page = 1;
    if (pathname.includes("category")) {
      const { id, name } = match.params;
      fetchCategory(id);
      topic.updateTab(id);
      setTitle(`${name[0].toUpperCase() + name.substring(1)} Quotes`);
    } else if (pathname.includes("quotes")) {
      const { id, name } = match.params;
      fetchAuthorQuotes(id);
      setTitle(`${name} Quotes`);
    } else {
      fetchHome();
      topic.updateTab(-1);
      setTitle("Featured Quotes");
    }
  };

  const handleScroll = () => {
    const ul = document.getElementsByClassName("quote-list")[2];
    if (!blocked && !noMore && ul) {
      const lastchild = ul.lastChild;
      const lastChildOffset = lastchild.offsetTop + lastchild.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset >= lastChildOffset) {
        if (pathname.includes("category")) {
          const { id, name } = match.params;
          page = page + 1;
          blocked = true;
          fetchCategory(id);
        } else if (pathname.includes("quotes")) {
          const { id, name } = match.params;
          page = page + 1;
          blocked = true;
          fetchAuthorQuotes(id);
        } else {
          page = page + 1;
          blocked = true;
          fetchHome();
        }
      }
    }
  };

  const fetchAuthorQuotes = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/source/${id}/quotes/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          blocked = false;
          noMore = quotes.length === 0;
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          blocked = false;
        }
      );
  };

  const fetchCategory = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/category/${id}/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          blocked = false;
          console.log(quotes.length);
          noMore = quotes.length === 0;
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          blocked = false;
        }
      );
  };

  const fetchHome = () => {
    console.log(page);
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          blocked = false;
          noMore = quotes.length === 0;
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          blocked = false;
        }
      );
  };

  const processQuotes = (quotes) => {
    const partitions = [];
    if (quotes.length > 0) {
      const partitionLength = Math.ceil(quotes.length / 3);

      for (let i = 0; i < quotes.length; i += partitionLength) {
        const partition = quotes.slice(i, i + partitionLength);
        partitions.push(partition);
      }

      setQuotes1((quotes1) => [...quotes1, ...partitions[0]]);
      setQuotes2((quotes2) => [...quotes2, ...partitions[1]]);
      setQuotes3((quotes3) => [...quotes3, ...partitions[2]]);
    }
  };

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
    <div className="container grid-md">
      <h5 className="top-title">{title}</h5>
      <div className="container-quotes">
        <QuoteList quotes={quotes1} />
        <QuoteList quotes={quotes2} />
        <QuoteList quotes={quotes3} />
      </div>
    </div>
  );
};

export default Home;
