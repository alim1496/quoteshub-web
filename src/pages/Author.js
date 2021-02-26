import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../style/author.scss";
import Quote from "../components/Quote";

const Author = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [source, setSource] = useState({});
  const [error, setError] = useState(false);
  const { id, name } = match.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://quotes-hub.herokuapp.com/api/quotes/v2/source/${id}/`)
      .then((res) => res.json())
      .then(
        ({ source, quotes }) => {
          setLoading(false);
          setQuotes(quotes);
          setSource(source);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      );
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
        onTryClick={fetchData}
      />
    );
  }

  return (
    <div className="author-container container grid-xl">
      <Helmet>
        <title>{name} | Quotes Hub</title>
      </Helmet>
      <div className="author-details">
        <div className="columns">
          <img src={source.cover} alt="cover" className="column col-sm-12 col-md-4 col-4" />
          <div className="author-desc column col-sm-12 col-md-8 col-8">
            <span>{name}</span>
            <p>{source.shortDesc}</p>
          </div>
        </div>
      </div>
      <div className="carousel-holder">
        <div className="title">{name} Quotes</div>
        <div className="author-quote-list">
          {quotes &&
            quotes.map((quote) => (
              <Quote quote={quote} key={quote.id} rightMargin={20} />
            ))}
        </div>
      </div>
      <Link to={`/quotes/${id}/${name}`} className="see-more">
        see more
      </Link>
    </div>
  );
};

export default Author;
