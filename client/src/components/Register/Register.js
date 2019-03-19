import React, { Component } from 'react'

import Avatar from './images.png';

export default class Register extends Component {
  render() {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-5 col-md-8 m-auto">
                    <div className="card card-body fix-logo-translate">
                        <img className='user-logo' src={Avatar}/>
                        <h1 className="text-center mb-3">Registruokis!</h1>
                        <form action="" method="POST">
                           <div className="form-group">
                                <label for="name">Vartotojo vardas</label>
                                <input type="text" name="username" className="form-control" placeholder="Vartotojo vardas"/>
                            </div>
                            <div className="form-group">
                                <label for="email">El. pašto adresas</label>
                                <input type="email" name="email" className="form-control" placeholder="El. paštas"/>
                                <small id="emailHelp" className="form-text text-muted">Jūsų el. paštas nebus niekur naudojamas</small>
                            </div>
                            <div className="form-group">
                                <label for="password">Slaptažodis</label>
                                <input type="password" name="password" className="form-control" placeholder="Slaptažodis"/>
                            </div>
                            <div className="form-group">
                                <label for="password2">Patvirtinti slaptažodį</label>
                                <input type="password" id="password2" name="password2" className="form-control" placeholder="Pakartokite slaptažodį"/>
                            </div>
                            <button type="submit" className="btn btn-danger btn-block">Registruotis</button>
                        </form>
                        <p style={{textAlign: 'left'}} className="lead mt-4">Jau užsiregistravęs? <a href="/users/login"> Prisijungti</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
