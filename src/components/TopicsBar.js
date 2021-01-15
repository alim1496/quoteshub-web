import React from "react";
import { Link } from "react-router-dom";
import "../style/topics-bar.scss";

const TopicsBar = ({ topics }) => {
  let topicList = [];
  if (topics.length > 0)
    topicList = [{ id: -1, name: "Featured Quote" }, ...topics];
  return (
    <div className="topics-bar">
      {topicList &&
        topicList.map(({ id, name }, index) => (
          <Link to={id !== -1 ? `/category/${id}/${name.split(" ")[0].toLowerCase()}` : ''}><span key={index}>{name.split(" ")[0]}</span></Link>
        ))}
    </div>
  );
};

export default TopicsBar;
