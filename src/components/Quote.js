import React from "react";

const Quote = ({ quote }) => (
  <div className="quote-body">
    <div className="quote-title">{quote.title}</div>
    <div className="quote-author">{quote.source.name}</div>
  </div>
);

export default Quote;
