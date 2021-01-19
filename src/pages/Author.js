import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { settings } from "../utils/SliderSettings";
import "../style/author.scss";

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
    fetch(`http://quotes-ocean.herokuapp.com/api/quotes/v2/source/${id}/`)
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
    <div className="author-container">
      <div className="author-details">
        <img src={source.cover} alt="cover" />
        <div className="author-desc">
          <span>{name}</span>
          <p>{source.shortDesc}</p>
        </div>
      </div>

      <Slider {...settings}>
        {quotes && quotes.map(({ id, title }) => <div key={id}>{title}</div>)}
      </Slider>
    </div>
  );
};

export default Author;
