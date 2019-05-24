import React, { Component } from 'react'
import './Login.css';
import avatar from './man.png';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Alert } from  'reactstrap';


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      message: null,
      redirect: false
    };
  }
  handleCheckbox = (e) => {
    this.setState({rememberMe: !this.state.rememberMe})
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  }
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
    // If authenticated, close modal
    if (isAuthenticated) {
      this.setState({redirect:true}); 
    }
  }
  /*static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };*/
  /*resetForm = () =>{
    document.getElementById("loginForm").reset();
  }*/
  render() {
    return (
        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-lg-5 m-auto">
              <div className="card card-body fix-logo-translate">
                <img className="user-logo" src={avatar} alt='user icon' />
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Prisijunk!</h1>
                {this.state.message ? <Alert color='danger'>{this.state.message}</Alert> : null}
                <form onSubmit={this.onSubmit} method="POST" id="loginForm">
                  <div className="form-group">
                    <label htmlFor="email">El. paštas</label>
                    <input 
                      value={this.state.email}
                      onChange={this.onChangeEmail} 
                      type="email" 
                      name="email" 
                      id='email'
                      className="form-control" 
                      placeholder="El. pašto adresas" 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Slaptažodis</label>
                    <input 
                      value={this.state.password}
                      onChange={this.onChangePassword} 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      placeholder="Slaptažodis" 
                    />
                  </div>
                  <div className="form-group form-check">
                    <input 
                      checked={this.state.rememberMe}
                      onChange={this.handleCheckbox}
                      type="checkbox" 
                      className="form-check-input" 
                      id='rememberMe' />
                    <label className="form-check-label" htmlFor="rememberMe">Prisiminti mane</label>
                  </div>
                  <button type="submit" className="btn btn-danger btn-block" onClick={this.resetForm}>Prisijungti</button>
                </form>
                <p style={{ textAlign: "left" }} className="lead mt-4">Neprisiregistravai?<Link style={{ textDecoration: 'none' }} to="/register"> Registruokis!</Link></p>
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
  { login, clearErrors }
)(Login);
