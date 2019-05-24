
import React, {Component} from 'react';
import Login from '../components/Login/Login.jsx';
import NavBar from '../components/Homepage/Navbar';


class LoginPage extends Component {
    render() {
      return (
        <div>
            <NavBar isDark={true}/>
            <Login />
        </div>
      );
    }
}
export default LoginPage;