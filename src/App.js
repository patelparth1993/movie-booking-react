import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { appStore } from "./AppStore";
import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MovieList from "./Components/MovieList";

class App extends React.Component {
  render() {
    return (
      <Provider store={appStore}>
        <Navigation />
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/movies' component={MovieList} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
