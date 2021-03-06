import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './NavbarDark.css';

class NavbarDark extends Component{
    render(){
        return(
            <div className="">
                <nav className="navbar navbar-expand-md bg-customDark">
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
                        <Link className="nav-link" to="/dashboard">Link</Link>
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

                    <Link className="btn btn-outline-light" to="/login" role="button">Login</Link>

                </div>
                </nav>
            </div>
        );
    }
}
export default NavbarDark;