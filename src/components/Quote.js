import React from "react";

const Quote = ({ quote }) => (
  <div className="quote-body">
    <p>{quote.title}</p>
    <br />
    <a href="#">{quote.source.name}</a>
  </div>
);

export default Quote;
