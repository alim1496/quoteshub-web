import React from "react";
import "../style/topics-bar.scss";

const TopicsBar = ({ topics }) => {
  let topicList = [];
  if (topics.length > 0)
    topicList = [{ id: -1, name: "Featured Quote" }, ...topics];
  return (
    <ul className="topics-bar">
      {topicList &&
        topicList.map(({ id, name }, index) => (
          <li key={index}>{name.split(" ")[0]}</li>
        ))}
    </ul>
  );
};

export default TopicsBar;
