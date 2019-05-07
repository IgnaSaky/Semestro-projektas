import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
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
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    /*componentDidMount() {
        axios.get('/api/auth/user', {withCredentials:true})
        .then(response => {
            console.log('user is CDM', response.data.user);
            if (response.data.success) {
                this.setState({
                    user: response.data.user,
                    isLoggedIn: true,
 
                });
            }
            else {
                console.log(response.data.message);
            }
        })
        .catch(error => {
            console.log('errror in componentdidmount in navbar');
            console.log(error);
        })
    }*/
    onLogoutClick(e) {
        e.preventDefault();
        axios.get('/api/auth/logout',{withCredentials:true})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
				this.setState({
					isLoggedIn: false,
					user: null
				})
			}
        })
        .catch(error => console.log(error))    
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    render(){
        const { isAuthenticated, user } = this.props.auth;
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