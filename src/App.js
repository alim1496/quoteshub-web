import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TopicsBar from "./components/TopicsBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => (
  <div className="container">
    <BrowserRouter>
      <TopicsBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/category/:id/:name" exact component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
