import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import home from './pages/home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
<<<<<<< HEAD
import dashboard from './pages/dashboard.jsx';
=======
import ProfilePage from './pages/ProfilePage.jsx';
>>>>>>> TAS12
import './App.css';

import { loadUser } from './actions/authActions'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
<<<<<<< HEAD
      <Router>
        <div>
          <Route exact path="/" component={home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={dashboard} />

        </div>
      </Router>
=======
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
          </div>
        </Router>
      </Provider>
      
>>>>>>> TAS12
    );
  }
}

export default App;
