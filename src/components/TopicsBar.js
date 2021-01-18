import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TopicContext, useTopic } from "../context/TabContextController";
import "../style/topics-bar.scss";

const TopicsBar = () => {
  const [topics, setTopics] = useState([]);
  const topic = useTopic();

  useEffect(() => {
    fetch(
      "http://quotes-ocean.herokuapp.com/api/quotes/v3/home/?with_topics=true&size=0"
    )
      .then((res) => res.json())
      .then(
        ({ categories }) => {
          setTopics(categories);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  let topicList = [];
  if (topics.length > 0)
    topicList = [{ id: -1, name: "Featured Quote" }, ...topics];
  return (
    <div className="main-navbar">
      <hr />
      <div className="topics-bar">
        {topicList &&
          topicList.map(({ id, name }, index) => (
            <Link
              key={index}
              to={
                id !== -1
                  ? `/category/${id}/${name.split(" ")[0].toLowerCase()}`
                  : ""
              }
              className={id === topic.tab ? "selected" : ""}
              onClick={() => topic.updateTab(id)}
            >
              <span>{name.split(" ")[0]}</span>
            </Link>
          ))}
      </div>
      <hr />
    </div>
  );
};

export default TopicsBar;
