import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

import { getFromStorage, removeFromStorage } from '../../utils/storage'
import axios from 'axios';

class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoggedIn: false
        }
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    componentDidMount() {
        const userStorage = getFromStorage('user');
        if (userStorage) {
            this.setState({
                user: userStorage,
                isLoggedIn: true
            });
        }
    }
    onLogoutClick(e) {
        axios.post('/api/auth/logout',{})
        .then(removeFromStorage('user'))
        .then(this.setState({
            user: {},
            isLoggedIn: false
        }))
        .catch(error => console.log(error));
    }
    render(){
        return(
            <div className="">
            The user is <b>{this.state.isLoggedIn ? 'currently' : 'not'}</b> logged in.
                <nav className="navbar navbar-expand-md bg-custom">
                <Link className="navbar-brand" to="/">Web Pavadinimas</Link>
                <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Link</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Link</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Link</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Link</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">Disabled</Link>
                    </li>
                    </ul>

                    <Link to='/' className='nav-link'>{this.state.user.username}</Link>
                    {this.state.isLoggedIn? (<button onClick={this.onLogoutClick} className='btn btn-outline-light'>Logout</button>) :
                    (<Link className="btn btn-outline-light" to="/login" role="button">Login</Link>)}

                </div>
                </nav>
            </div>
        );
    }
}
export default NavBar;