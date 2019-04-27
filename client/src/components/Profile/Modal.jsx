
import React from 'react'

function Modal() {
  return (
    <div>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Slaptžodžio keitimas</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form  id="passwordEditForm">
                        <div className="form-group">
                            <label htmlFor="oldPassword">Senas slaptažodis</label>
                            <input
                                //onChange={this.handleUsername} 
                                type="password" 
                                className="form-control" 
                                placeholder="Senas slaptažodis" 
                                id="oldPassword"
                                required='true'
                            />
                        </div>
                            <div className="form-group">
                                <label htmlFor="newPassword1">Naujas slaptažodis</label>
                                <input   
                                    //onChange={this.handleEmail} 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Naujas slaptažodis" 
                                    id="newPassword1"
                                    required='true'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword2">Pakartokite slaptažodį</label>
                                <input 
                                    //onChange={this.handlePassword1} 
                                    type="password"
                                    className="form-control"
                                    placeholder="Naujas slaptažodis" 
                                    id="newPassword2"
                                    required='true'
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
    </div>
  )
}

export default Modal
