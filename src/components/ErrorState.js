import React from "react";
import error from "../assets/images/error-img.png";

const ErrorState = ({ msg, tryAgain, tryMsg, onTryClick }) => (
  <div className="error-container">
    <img src={error} alt="error" />
    <p>{msg}</p>
    {tryAgain && (
      <button type="button" onClick={onTryClick}>
        {tryMsg}
      </button>
    )}
  </div>
);

export default ErrorState;
