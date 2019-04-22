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
        e.preventDefault();
        axios.get('/api/auth/logout')
        .then(response => {
            console.log(response.data)
            removeFromStorage('user');
            this.setState({
                user: {},
                isLoggedIn: false
            })
        })
        .catch(error => console.log(error));
    }
    render(){
        return(
            <React.Fragment>
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

                    
                    {this.state.isLoggedIn
                    ? <React.Fragment>
                        <Link to='/' className='nav-link'>{this.state.user.username}</Link>
                        <button type="submit" onClick={this.onLogoutClick} className='btn btn-outline-light'>Logout</button>
                      </React.Fragment>
                    : (<Link className="btn btn-outline-light" to="/login" role="button">Login</Link>)}

                </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default NavBar;