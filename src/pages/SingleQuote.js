import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import constants from "../utils/constants";

const { mainUrl } = constants;

const SingleQuote = ({ match }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    const { id } = match.params;
    fetch(`${mainUrl}quotes/v2/quote/${id}/`)
      .then((res) => res.json())
      .then(
        ({ title, author, author_id, author_img }) => {
          setTitle(title);
          setAuthor(author);
          setImage(author_img);
          setId(author_id);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="boundary-quote">
      <div className="container grid-xs single-quote-holder">
        <Helmet>
          <title>
            {title} | {author}
          </title>
        </Helmet>
        <div className="author-part">
          <img src={image} alt="author" />
          <div>
            <span>{author}</span>
            <Link to={`/author/${id}/${author}`}>View Profile</Link>
          </div>
        </div>
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default SingleQuote;
