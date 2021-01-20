import React from "react";
import { Link } from "react-router-dom";

const Quote = ({ quote, rightMargin }) => (
  <div className="quote-body" style={{ marginRight: `${rightMargin}px` }}>
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
