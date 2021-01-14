import React from "react";

const Quote = ({ quote }) => (
  <div className="quote-body">
    <span className="single-quote">“</span>
    <p>{quote.title}</p>
    <a href="#">{quote.source.name}</a>
  </div>
);

export default Quote;
