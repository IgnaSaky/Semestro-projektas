import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import home from './pages/home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EventPage from './pages/Event.jsx';
import dashboard from './pages/dashboard.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import TicketSavingPage from './pages/TicketSavingPage.jsx';
import './App.css';

import { loadUser } from './actions/authActions'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/dashboard/:city" component={dashboard} />
            <Route path="/ticketSaving" component={TicketSavingPage} />
            <Route path="/event/:id" component={EventPage} />

          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;
