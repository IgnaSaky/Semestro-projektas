import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from './pages/home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import dashboard from './pages/dashboard.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={dashboard} />

        </div>
      </Router>
    );
  }
}

export default App;
