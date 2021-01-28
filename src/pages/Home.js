import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";

import QuoteList from "../components/QuoteList";
import "../style/home.scss";
import "../style/pagination.scss";
import ErrorState from "../components/ErrorState";
import ReactPaginate from 'react-paginate';
import { TopicContext, useTopic } from "../context/TabContextController";

const Home = ({ location, match }) => {
  const partitions = [];
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const topic = useTopic();
  const { pathname } = location;
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    changePage(1);
  }, [pathname]);

  const changePage = async (_page) => {
    console.log(_page.selected);
    await setPage(parseInt(_page.selected, 10));
    checkPath();
  };

  const checkPath = async () => {
    await setQuotes([]);
    setLoading(true);
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

  const fetchAuthorQuotes = (id) => {
    fetch(
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/source/${id}/quotes/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          setQuotes(quotes);
          setCount(count);
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
      `http://quotes-ocean.herokuapp.com/api/quotes/v2/category/${id}/?page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          setQuotes(quotes);
          setCount(count);
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
      `http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?featured=true&page=${page}&size=30`
    )
      .then((res) => res.json())
      .then(
        ({ quotes, count }) => {
          setQuotes(quotes);
          setCount(count);
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
      {count > 30 && (
        <ReactPaginate
          pageCount={Math.ceil(count/30)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination-container"
          pageClassName="page-item"
          previousClassName="prev-page-item"
          nextClassName="next-page-item"
          breakClassName="break-item"
          activeClassName="page-item-active"
          onPageChange={(p) => changePage(p)}
        />
      )}
    </div>
  );
};

export default Home;
