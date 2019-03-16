import React, { Component } from 'react'
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div>
          <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-lg-6 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3"><i class="fas fa-sign-in-alt"></i> Prisijunkite</h1>
                            <form action="" method="POST">
                                <div className="form-group">
                                    <label htmlFor="email">El. paštas</label>
                                    <input type="email" name="email" className="form-control" placeholder="El. pašto adresas"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Slaptažodis</label>
                                    <input type="password" id="password" name="password" className="form-control" placeholder="Slaptažodis"/>
                                </div>
                                <button type="submit" className="btn btn-danger btn-block">Prisijunkti</button>
                            </form>
                            <p style={{textAlign: "left"}} className="lead mt-4">Neprisiregistravęs?<a style={{textDecoration: 'none'}} href="/users/register"> Registruokis</a></p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}
