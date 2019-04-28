import React, { Component } from 'react'
import './css/Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
            message: '',
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }

    handleInputs(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        const { id } = this.props.user
        e.preventDefault();
        console.log(this.state);
        console.log(this.props);
        
        axios.put(`/api/users/${id}`,{
            oldPassword: this.state.oldPassword,
            newPassword1: this.state.newPassword1,
            newPassword2: this.state.newPassword2
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                message: response.data.message,
                success: response.data.success
            });
        });
    }

  render() {
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Slaptžodžio keitimas</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit} id="passwordEditForm">
                            <div className="form-group mb-3">
                                <label className='required' htmlFor="oldPassword">Senas slaptažodis</label>
                                <input
                                    onChange={this.handleInputs}
                                    value={this.state.oldPassword}
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Senas slaptažodis" 
                                    name="oldPassword"
                                    id="oldPassword"
                                />
                            </div>
                                <div className="form-group mb-3">
                                    <label className="required" htmlFor="newPassword1">Naujas slaptažodis</label>
                                    <input   
                                        onChange={this.handleInputs} 
                                        value={this.state.newPassword1}
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Naujas slaptažodis"
                                        name="newPassword1" 
                                        id="newPassword1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="required" htmlFor="newPassword2">Pakartokite slaptažodį</label>
                                    <input 
                                        onChange={this.handleInputs} 
                                        value={this.state.newPassword2}
                                        type="password"
                                        className="form-control"
                                        placeholder="Naujas slaptažodis" 
                                        name="newPassword2"
                                        id="newPassword2"
                                    />
                                </div> 
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Uždaryti</button>
                                    <button type="submit" className="btn btn-primary">Išsaugoti</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
            { this.state.success && (
                   <Redirect to={`/users/${this.props.user.id}`} />
                )}
        </div>
    )
  }
}

export default Modal
