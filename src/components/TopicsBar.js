import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/topics-bar.scss";

const TopicsBar = () => {
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(-1);

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
              className={id === selected ? "selected" : ""}
              onClick={() => setSelected(id)}
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
