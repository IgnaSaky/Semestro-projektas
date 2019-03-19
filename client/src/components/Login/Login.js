import React, { Component } from 'react'
import './Login.css';
import avatar from './man.png';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.OnChangeEmail = this.onChangeEmail.bind(this);
    this.OnChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      rememberMe: ''
    }
  }
  onChangeEmail(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('localhost:5000/login', data).then(res => console.log(res.data));

    this.setState({
      email: '',
      password: ''
    });
  }
  render() {
    return (
      <React.Fragment>
          <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-lg-5 m-auto">
                    <div className="card card-body fix-logo-translate">
                        <img className="user-logo" src={avatar} alt='user icon'/>
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Prisijunk!</h1>
                        <form onSubmit={this.onSubmit} action="/login" method="POST">
                            <div className="form-group">
                                <label htmlFor="email">El. paštas</label>
                                <input onChange={this.onChangeEmail} type="email" name="email" className="form-control" placeholder="El. pašto adresas"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Slaptažodis</label>
                                <input onChange={this.onChangePassword} type="password" id="password" name="password" className="form-control" placeholder="Slaptažodis"/>
                            </div>
                            <div className="form-group form-check">
                              <input type="checkbox" className="form-check-input" id='rememberMe'/>
                              <label className="form-check-label" for="rememberMe">Prisiminti mane</label>
                            </div>
                            <button type="submit" className="btn btn-danger btn-block">Prisijungti</button>
                        </form>
                        <p style={{textAlign: "left"}} className="lead mt-4">Neprisiregistravai?<Link style={{textDecoration: 'none'}} to="/register"> Registruokis!</Link></p>
                    </div>
                </div>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
