   
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Logout from '../Logout/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class NavBar extends Component {
    
    render(){
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <React.Fragment>
                <Link to='/profile' className='nav-link'>{user ? user.username: ''}</Link>
                <Logout/>   
            </React.Fragment>  
        );
        const guestLinks = (          
                <Link className="btn btn-outline-light" to="/login" role="button">Login</Link>           
        );
        
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

                    {isAuthenticated ? authLinks : guestLinks}

                </div>
                </nav>
            </React.Fragment>
    
        );
    }
}


NavBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    null
)(NavBar);
