import React, { Component } from 'react'
import './Login.css';
import avatar from './man.png';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
//import { setInStorage } from '../../utils/storage';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
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

    const {email, password} = this.state;
  
    axios.post('/api/auth/login', {
      email,
      password
    })
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response;
     })
    .then(response => {
      if (response.data.success) {       
        
        //setInStorage('user', response.data.user);
        this.setState({
          email: '',
          password: '',
          redirect: true
        });
      } else {
        console.log('not logged in');
      }
    })
    .catch(err => console.log(err) );
  }
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
                <form onSubmit={this.onSubmit} method="POST" id="loginForm">
                  <div className="form-group">
                    <label htmlFor="email">El. paštas</label>
                    <input 
                      value={this.state.email}
                      onChange={this.onChangeEmail} 
                      type="email" 
                      name="email" 
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
