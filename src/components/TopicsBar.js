import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { TopicContext, useTopic } from "../context/TabContextController";
import logo from "../assets/images/logo.png";
import menu from "../assets/images/menu-icon.png"
import "../style/topics-bar.scss";

const TopicsBar = () => {
  const [topics, setTopics] = useState([]);
  const topic = useTopic();
  const currentRoute = useHistory().location.pathname.toLowerCase();

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

  const checkRoute = (id) => {
    // if (!(currentRoute.includes("category")) && currentRoute === "/") return true;
    if (
      currentRoute.includes("category") &&
      currentRoute.split("/")[2] === id.toString()
    )
      return true;
    return false;
  };

  let topicList = [];
  if (topics.length > 0)
    topicList = [{ id: -1, name: "Featured Quote" }, ...topics];
  return (
    <div className="main-navbar">
      <div className="topics-bar-mobile">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
        <img src={menu} alt="menu" />
      </div>
      <div className="mobile-menu-modal">
        {topicList &&
          topicList.map(({ id, name }, index) => (
            <NavLink
              key={index}
              to={
                id !== -1
                  ? `/category/${id}/${name.split(" ")[0].toLowerCase()}`
                  : ""
              }
              className={checkRoute(id) ? "selected" : ""}
            >
              <span>{name.split(" ")[0]}</span>
            </NavLink>
          ))}
      </div>
      <div className="container grid-xl topics-bar">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
        {topicList &&
          topicList.map(({ id, name }, index) => (
            <NavLink
              key={index}
              to={
                id !== -1
                  ? `/category/${id}/${name.split(" ")[0].toLowerCase()}`
                  : ""
              }
              className={checkRoute(id) ? "selected" : ""}
            >
              <span>{name.split(" ")[0]}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default TopicsBar;
