import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Avatar from './images.png';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(e) {
        this.setState({ username: e.target.value });
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handlePassword1(e) {
        this.setState({ password1: e.target.value });
    }
    handlePassword2(e) {
        this.setState({ password2: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        
        const {username, email, password1, password2} = this.state;
        const data = {
            username,
            email,
            password1,
            password2
        }

        axios.post('http://localhost:5000/api/auth/register', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            username: '',
            email: '',
            password1: '',
            password2: ''
        });
    }
    
    resetForm = () =>{
        document.getElementById("registerForm").reset();
    }
    render() {
        return (
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-lg-5 col-md-8 m-auto">
                        <div className="card card-body fix-logo-translate">
                            <img className='user-logo' src={Avatar} alt="avatar" />
                            <h1 className="text-center mb-3">Registruokis!</h1>
                            <form onSubmit={this.handleSubmit} action="" method="POST" id="registerForm">
                                <div className="form-group">
                                    <label htmlFor="name">Vartotojo vardas</label>
                                    <input onChange={this.handleUsername} type="text" name="username" className="form-control" placeholder="Vartotojo vardas" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">El. pašto adresas</label>
                                    <input onChange={this.handleEmail} type="email" name="email" className="form-control" placeholder="El. paštas" />
                                    <small id="emailHelp" className="form-text text-muted">Jūsų el. paštas nebus niekur naudojamas</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Slaptažodis</label>
                                    <input onChange={this.handlePassword1} type="password" name="password" className="form-control" placeholder="Slaptažodis" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Patvirtinti slaptažodį</label>
                                    <input onChange={this.handlePassword2} type="password" id="password2" name="password2" className="form-control" placeholder="Pakartokite slaptažodį" />
                                </div>
                                <button type="submit" className="btn btn-danger btn-block" onClick={this.resetForm}>Registruotis</button>
                            </form>
                            <p style={{ textAlign: 'left' }} className="lead mt-4">Jau užsiregistravęs? <Link to="/login"> Prisijungti</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
