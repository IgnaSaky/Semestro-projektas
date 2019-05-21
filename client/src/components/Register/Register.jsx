import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Avatar from './images.png';
//import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Alert } from 'reactstrap';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            username: '',
            email: '',
            password1: '',
            password2: '',
            message: null,
            success: false,
            redirect: false
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePassword1(e) {
        this.setState({
            password1: e.target.value
        })
    }
    handlePassword2(e) {
        this.setState({ 
            password2: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();    
        const {username, email, password1, password2} = this.state;
        const newUser = {
            username,
            email,
            password1,
            password2
        }
    
        // Attempt to register
        this.props.register(newUser);
    }
    // static propTypes = {
    //     isAuthenticated: PropTypes.bool,
    //     error: PropTypes.object.isRequired,
    //     register: PropTypes.func.isRequired,
    //     clearErrors: PropTypes.func.isRequired
    // };
    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            //check for REgister errors
            if (error.id === "REGISTER_FAIL") {
                console.log(error.message);
                this.setState({message: error.message.message});
            } else {
                this.setState({message: null});
            }
        }
        // If authenticated, redirect
        if (isAuthenticated) {
            this.setState({redirect:true});
        }
        
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-lg-5 col-md-8 m-auto">
                        <div className="card card-body fix-logo-translate">
                            <img className='user-logo' src={Avatar} alt="avatar" />
                            <h1 className="text-center mb-3">Registruokis!</h1>
                            {this.state.message ? <Alert color='danger'>{this.state.message}</Alert> : null}
                            <form onSubmit={this.handleSubmit}  method="POST" id="registerForm">
                                <div className="form-group">
                                    <label htmlFor="username">Vartotojo vardas</label>
                                    <input
                                        value={this.state.username}
                                        onChange={this.handleUsername} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Vartotojo vardas" 
                                        id="username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">El. pašto adresas</label>
                                    <input 
                                        value={this.state.email}
                                        onChange={this.handleEmail} 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="El. paštas" 
                                        id="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">Jūsų el. paštas nebus niekur naudojamas</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Slaptažodis</label>
                                    <input 
                                        value={this.state.password1}
                                        onChange={this.handlePassword1} 
                                        type="password"
                                        className="form-control"
                                        placeholder="Slaptažodis" 
                                        id="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Patvirtinti slaptažodį</label>
                                    <input 
                                        value={this.state.password2}
                                        onChange={this.handlePassword2} 
                                        type="password" 
                                        id="password2"  
                                        placeholder="Pakartokite slaptažodį" 
                                        className="form-control" 
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger btn-block" onClick={this.handleSubmit}>Registruotis</button>
                            </form>
                            <p style={{ textAlign: 'left' }} className="lead mt-4">Jau užsiregistravęs? <Link to="/login"> Prisijungti</Link></p>
                        </div>
                    </div>
                </div>
                {this.state.redirect && (
                   <Redirect to={'/'} />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    {register, clearErrors}
)(Register);
