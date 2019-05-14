import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TicketSaving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            selectedFile: null
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
    }
    handleTitle(e) {
        this.setState({ title: e.target.value });
    }
    handleDescription(e) {
        this.setState({ description: e.target.value });
    }
    handlePrice(e) {
        this.setState({ price: e.target.value });
    }
    handleFile=event=> {
        console.log(event.target.files);
        this.setState({ selectedFile: event.target.files[0],
        loaded: 0, 
    })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('file', this.state.selectedFile);
        data.set('title', this.state.title);
        data.set('description', this.state.description);
        data.set('price', this.state.price);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        axios.post('http://localhost:5000/api/tickets/ticketSaving', data, config )
            .then(res => console.log(res.statusText))
            .catch(err => console.log(err));

    }

    resetForm = () =>{
        document.getElementById("TicketForm").reset();
      }
    render() {
        return (
            <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-lg-5 col-md-8 m-auto">
                    <div className="card card-body fix-logo-translate">
                        <h1 className="text-center mb-3">Įkelk Bilietą!</h1>
                        <form onSubmit={this.handleSubmit} action="" method="POST" id="TicketForm" enctype="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="title">Renginio pavadinimas</label>
                                <input onChange={this.handleTitle} type="text" name="title" className="form-control" placeholder="Renginio pavadinimas" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Aprašymas</label>
                                <input onChange={this.handleDescription} type="text" name="description" className="form-control" placeholder="Bilieto aprašymas" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Kaina</label>
                                <input onChange={this.handlePrice} type="number" name="price" className="form-control" placeholder="Kaina" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="file"></label>
                                <input onChange={this.handleFile} type="file" name="file" />
                            </div>
                            <button type="button" className="btn btn-danger btn-block" onClick={this.handleSubmit}>Įkelti</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        )
    }
}