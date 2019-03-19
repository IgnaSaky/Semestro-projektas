
import React, {Component} from 'react';
import Login from '../components/Login/Login';
import NavBar from '../components/Homepage/Navbar';


class LoginPage extends Component {
    render() {
      return (
        <div>
            <NavBar/>
            <Login />
        </div>
      );
    }
}
export default LoginPage;