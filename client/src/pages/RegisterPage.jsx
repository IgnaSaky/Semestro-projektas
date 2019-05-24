import React, {Component} from 'react';
import Register from '../components/Register/Register.jsx';
import NavBar from '../components/Homepage/Navbar';

class RegisterPage extends Component{
    render(){
        return(
            <div>
                <NavBar isDark={true}/>
                <Register/>
            </div>
        );
    }
}
export default RegisterPage;