import React from "react";
import "../style/topics-bar.scss";

const TopicsBar = ({ topics }) => {
  let topicList = [];
  if (topics.length > 0)
    topicList = [{ id: -1, name: "Featured Quote" }, ...topics];
  return (
    <div className="topics-bar">
      {topicList &&
        topicList.map(({ id, name }, index) => (
          <span key={index}>{name.split(" ")[0]}</span>
        ))}
    </div>
  );
};

export default TopicsBar;
