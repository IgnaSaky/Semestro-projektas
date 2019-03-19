import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Customers from './components/customers';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Customers />

        
        <Register/>
        <Login />
      </div>
    );
  }
}

export default App;
