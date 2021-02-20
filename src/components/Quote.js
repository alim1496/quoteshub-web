import React from "react";
import { Link } from "react-router-dom";

const Quote = ({ quote }) => (
  <div className="quote-body column col-4 col-lg-6 col-sm-12">
    <span className="single-quote">“</span>
    <p>{quote.title}</p>
    {quote.source && (
      <Link to={`/author/${quote.source.id}/${quote.source.name}`}>
        {quote.source.name}
      </Link>
    )}
  </div>
);

export default Quote;
