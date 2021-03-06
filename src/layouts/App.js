import React, {Component} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/main.css";
import Navigation from "./Navigation";
import Main from "./Main";

class App extends Component {
  render() {
    return(
      <Router>
        <div className="app">
          {<Navigation />}
          {<Main />}
        </div>
      </Router>
    )
  }
}

export default App;