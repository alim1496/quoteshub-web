import React from "react";
import { Link } from "react-router-dom";

const Quote = ({ quote }) => (
  <div className="quote-body">
    <span className="single-quote">“</span>
    <p>{quote.title}</p>
    <Link to={`/author/${quote.source.id}/${quote.source.name}`}>
      {quote.source.name}
    </Link>
  </div>
);

export default Quote;
