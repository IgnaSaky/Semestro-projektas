   
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Navbar.css';
import Logout from '../Logout/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoggedIn: false,
            redirect: false
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    render(){
        const { isAuthenticated, user } = this.props.auth;
        //console.log('navbar', console.log(isAuthenticated));
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

                    {isAuthenticated
                    ? <React.Fragment>
                        <Link to='/profile' className='nav-link'>{user.username}</Link>
                        <Logout/>
                        
                      </React.Fragment>
                    : (<Link className="btn btn-outline-light" to="/login" role="button">Login</Link>)}

                </div>
                {this.state.redirect && (
              <Redirect to={'/'} />
            )}
                </nav>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    null
)(NavBar);

