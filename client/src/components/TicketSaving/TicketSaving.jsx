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
            file: ''
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleFile = this.handleFile.bind(this);
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
    handleFile(e) {
        this.setState({ file: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            file: this.state.file
        }

        axios.post('http://localhost:5000/api/tickets/ticketSaving', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            title: '',
            description: '',
            price: '',
            file: ''
        });
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
                        <form onSubmit={this.handleSubmit} action="" method="POST" id="TicketForm">
                        {/* <div className="form-group">
                                <label htmlFor="title">Renginio pavadinimas</label>
                                <input onChange={this.handleTitle} type="search" name="title" className="form-control" placeholder="Renginio pavadinimas" />
                                <button>Ieškoti</button>
                            </div> */}
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
                                <label htmlFor="file">Bilietas</label>
                                <input onChange={this.handleFile} type="file" accept=".pdf" name="file" id="file" className="form-control" placeholder="Bilietas"/>
                            </div>
                            <button type="submit" className="btn btn-danger btn-block" onClick={this.resetForm}>Įkelti</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        )
    }
}