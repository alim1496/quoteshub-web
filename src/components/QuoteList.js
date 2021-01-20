import React from "react";
import Quote from "./Quote";

const QuoteList = ({ quotes }) => (
  <div className="quote-list">
    {quotes &&
      quotes.map((quote) => (
        <Quote quote={quote} key={quote.id} rightMargin={0} />
      ))}
  </div>
);

export default QuoteList;
