   
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Logout from '../Logout/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class NavBar extends Component {
    
    render(){
        
        const { isAuthenticated, user } = this.props.auth;
        let {isDark} = this.props
        if(typeof isDark === "undefined"){
            isDark = false;
        }
        const authLinks = (
            <React.Fragment>
                <Link to='/profile' className='nav-link'>{user != null ? (typeof user !== "undefined" ? user.user.username : ''): ''}</Link>
                <Logout/>   
            </React.Fragment>  
        );
        const authLinksBlack = (
            <React.Fragment>
                <Link to='/profile' className='nav-link blackNav'>{user != null ? (typeof user !== "undefined" ? user.user.username : ''): ''}</Link>
                <div className="blackNav"><Logout/></div>  
            </React.Fragment>  
        );
        const guestLinks = (          
            <Link className="btn btn-outline-light" to="/login" role="button">Login</Link>           
    );
        const guestLinksBlack = (          
                <Link className="btn btn-dark" to="/login" role="button">Login</Link>           
        );
        
        if(isDark){return(
            <React.Fragment>
                <nav className="navbar navbar-expand-md bg-custom">
                <Link className="navbar-brand blackNav" to="/">Bilietų pardavimas</Link>
                <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link blackNav" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link blackNav" to="/dashboard/all">Renginiai</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link blackNav" to="/">Link</Link>
                    </li>
                    </ul>

                    {isAuthenticated ? authLinksBlack : guestLinksBlack}

                </div>
                </nav>
            </React.Fragment>
    
        );}
        else{
            return(
                <React.Fragment>
                    <nav className="navbar navbar-expand-md bg-custom">
                    <Link className="navbar-brand" to="/">Bilietų pardavimas</Link>
                    <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link white" to="/">Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link white" to="/dashboard/all">Renginiai</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link white" to="/">Link</Link>
                        </li>
                        </ul>
    
                        {isAuthenticated ? authLinks : guestLinks}
    
                    </div>
                    </nav>
                </React.Fragment>
        
            );
        }
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
