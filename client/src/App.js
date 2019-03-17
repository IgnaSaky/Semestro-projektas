import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from './pages/home.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={home} />
        </div>
      </Router>
    );
  }
}

export default App;
