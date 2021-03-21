import React, {Component} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/main.css";
import Navigation from "./Navigation";
import Main from "./Main";
import Footer from "./Footer";

class App extends Component {
  render() {
    return(
      <>
      <Router >
        <div className="app">
          {<Navigation />} 
          {<Main/>}
          {<Footer/>}
        </div>
      </Router>
      </>
    )
  }
}

export default App;