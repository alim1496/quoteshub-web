import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TopicsBar from "./components/TopicsBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TabContext from "./context/TabContext";
import { TopicContextProvider } from "./context/TabContextController";
import Author from "./pages/Author";

const App = () => {
  return (
    <TopicContextProvider>
      <div className="container">
        <BrowserRouter>
          <TopicsBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/category/:id/:name" exact component={Home} />
            <Route path="/author/:id/:name" exact component={Author} />
            <Route path="/quotes/:id/:name" exact component={Home} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </TopicContextProvider>
  );
};

export default App;
