import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Customers from './components/customers';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />

        </div>
      </Router>
    );
  }
}

export default App;
