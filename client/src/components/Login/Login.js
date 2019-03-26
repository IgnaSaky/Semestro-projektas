import React, { Component } from 'react'
import './Login.css';
import avatar from './man.png';
import {Link} from 'react-router-dom';
export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
          <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-lg-5 m-auto">
                    <div className="card card-body fix-logo-translate">
                        <img className="user-logo" src={avatar} alt='user icon'/>
                        <h1 className="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Prisijunk!</h1>
                        <form action="" method="POST">
                            <div className="form-group">
                                <label htmlFor="email">El. paštas</label>
                                <input type="email" name="email" className="form-control" placeholder="El. pašto adresas"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Slaptažodis</label>
                                <input type="password" id="password" name="password" className="form-control" placeholder="Slaptažodis"/>
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
