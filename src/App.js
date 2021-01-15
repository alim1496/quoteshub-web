import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/category/:id/:name" component={Home} />
		</Switch>
	</BrowserRouter>
)

export default App;
