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
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);
  const [blocked, setBlocked] = useState(false);
  
  useEffect(() => {
    checkPath();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname]);

  const checkPath = async () => {
    await setQuotes1([]);
    await setQuotes2([]);
    await setQuotes3([]);
    setLoading(true);
    setPage(1);
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

  const handleScroll = async () => {
    const ul = document.getElementsByClassName("quote-list")[0];
    if (ul) {
      const lastchild = ul.lastChild;
      const lastChildOffset = lastchild.offsetTop + lastchild.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (!blocked && !noMore && pageOffset >= lastChildOffset) {
        if (pathname.includes("category")) {
          const { id, name } = match.params;
          await setPage(page + 1);
          fetchCategory(id);
        } else if (pathname.includes("quotes")) {
          const { id, name } = match.params;
          await setPage(page + 1);
          fetchAuthorQuotes(id);
        } else {
          await setPage(page + 1);
          fetchHome();
        }
      //   if (pathname.includes('category')) {
      //     const { match: { params } } = this.props;
      //     const { catID, category } = params;
      //     if (catID) {
      //       this.setState(prevState => ({
      //         page: prevState.page + 1,
      //       }), () => this.fetchCategoryMore(catID));
      //     } else {
      //       this.fetchMoreOtherNews(category);
      //     }
      //   } else {
      //     this.setState(prevState => ({
      //       page: prevState.page + 1,
      //     }), () => this.fetchMoreFeed());
      //   }
      }
    }
  };

  const fetchAuthorQuotes = (id) => {
    setBlocked(true);
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/source/${id}/quotes/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          setBlocked(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setBlocked(false);
        }
      );
  };

  const fetchCategory = (id) => {
    setBlocked(true);
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/category/${id}/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          setBlocked(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setBlocked(false);
        }
      );
  };

  const fetchHome = () => {
    setBlocked(true);
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          processQuotes(quotes);
          setCount(count);
          setLoading(false);
          setBlocked(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          setBlocked(false);
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

      setQuotes1(quotes1 => [...quotes1, ...partitions[0]]);
      setQuotes2(quotes2 => [...quotes2, ...partitions[1]]);
      setQuotes3(quotes3 => [...quotes3, ...partitions[2]]);

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
    <div className="main-container">
      <h2 className="top-title">{title}</h2>
      <div className="container-quotes">
        <QuoteList quotes={quotes1} />
        <QuoteList quotes={quotes2} />
        <QuoteList quotes={quotes3} />
      </div>
    </div>
  );
};

export default Home;
