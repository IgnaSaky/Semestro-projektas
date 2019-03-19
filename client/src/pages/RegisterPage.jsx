import React, {Component} from 'react';
import Register from '../components/Register/Register';
import NavBar from '../components/Homepage/Navbar';

class RegisterPage extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <Register/>
            </div>
        );
    }
}
export default RegisterPage;