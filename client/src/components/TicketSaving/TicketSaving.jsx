import React, { Component } from 'react'
import axios from 'axios';
import './TicketSaving.css';
import SingleDatePicker from 'react-dates';

export default class TicketSaving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            description: '',
            price: '',
            selectedFile: null,
            suggestions: [],
            text: '',
            items: [],
            adress: '',
            date: new Date(),
            eventDescription: '',
        }
        this.handleAdress = this.handleAdress.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
    }
    handleDescription(e) {
        this.setState({ description: e.target.value });
    }
    handlePrice(e) {
        this.setState({ price: e.target.value });
    }
    handleFile=event=> {
        this.setState({ selectedFile: event.target.files[0],
        loaded: 0, 
    })
    }
    
    handleTicketSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('file', this.state.selectedFile);
        data.append('title', this.state.text);
        data.append('description', this.state.description);
        data.append('price', this.state.price);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        axios.post('http://localhost:5000/api/tickets/ticketSaving', data, config )
            .then(res => console.log(res.statusText))
            .catch(err => console.log(err));
    }

    onTextChanged = (e) => {
        const value=e.target.value;
        let suggestions=[];
        if(value.length>0){
            const regex=new RegExp(`^${value}`, 'i');
            suggestions=this.state.items.sort().filter(v => regex.test(v)); 
        }
        this.setState(() => ({suggestions, text:value}));
    }
    renderSuggestions (){
        const {suggestions}=this.state;
        if(suggestions.length===0){
            return null;
        }
        return (
            <ul className="suggestion-container">
            {suggestions.map((item) => <li className="suggestion" key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>    
        );
    }
    suggestionSelected(value){
        this.setState(()=>({
            text:value,
            suggestions:[],
        }));
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/AutoTextCompletion')
        .then(response => response.json())
        .then(users => {
            //this.items=users;
            for(let i = 0; i< users.length; i++){
                this.state.items.push(users[i].title);
            }
        });
    }

    resetForm = () =>{
        document.getElementById("TicketForm").reset();
      } 

    handleTitle(e) {
        this.setState({ title: e.target.value });
    }
    handleEventDescription(e) {
        this.setState({ eventDescription: e.target.value });
    }
    handleAdress(e) {
        this.setState({ adress: e.target.value });
    }
    handleDate(e) {
        this.setState({ date: e.target.value});
    }
    handleCategory(e) {
        this.setState({ category: e.target.value });
    }
    handleEventSubmit = (e) => {
        e.preventDefault();
        let eventData = new FormData();
        eventData.append('title', this.state.title);
        eventData.append('eventDescription', this.state.eventDescription);
        eventData.append('address', this.state.adress);
        eventData.append('date', this.state.date);
        eventData.append('category', this.state.category);
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('http://localhost:5000/api/tickets/eventSaving', eventData, config )
        .then(res => console.log(res.statusText))
        .catch(err => console.log(err));
}

    render() {
        const {text}=this.state;
        return (
            <div className="container">
      
      <div className="tab-content" id="myTabContent">
      <ul className="nav nav-tabs col-lg-4 col-md-7 m-auto" id="myTab" role="tablist">
                    <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Bilietai</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Renginiai</a>
                    </li>
                </ul>
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="col-lg-5 col-md-8 m-auto">
                    
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Įkelti bilietą!</h1>
                        <form onSubmit={this.handleTicketSubmit} action="" method="POST" id="TicketForm" enctype="multipart/form-data">
                            <div className="form-group">
                            <input value={text} className="form-control col-20" type="text" placeholder="Renginio pavadinimas" aria-label="Search" onChange={this.onTextChanged}/>
                            {this.renderSuggestions()}
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleDescription} type="text" name="description" id="description" className="form-control" placeholder="Bilieto aprašymas" />
                            </div>
                            <div className="form-group">
                                <input onChange={this.handlePrice} type="number" name="price" id="price" className="form-control" placeholder="Kaina" />
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleFile} type="file" name="file" id="file" />
                            </div>
                            <button type="button" className="btn btn-danger btn-block" onClick={this.handleTicketSubmit}>Įkelti</button>
                        </form>
                    </div>
                </div>
            </div>

        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div className="row">
                <div className="col-lg-5 col-md-8 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Įkelti renginį!</h1>
                        <form onSubmit={this.handleEventSubmit} action="" method="POST" id="EventForm" enctype="multipart/form-data">
                            <div className="form-group">
                                <input onChange={this.handleTitle} type="text" name="title" id="title" className="form-control" placeholder="Renginio pavadinimas" />
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleEventDescription} type="text" name="eventDescription" id="eventDescription" className="form-control" placeholder="Renginio aprašymas" />
                            </div>
                            <div className="form-group">
                            <select value={this.state.adress}
                                onChange={this.handleAdress}>
                                <option value="miestas">Miestas</option>
                                <option value="vilnius">Vilnius</option>
                                <option value="kaunas">Kaunas</option>
                                <option value="klaipeda">Klaipėda</option>
                                 <option value="šiauliai">Šiauliai</option>
                                </select> 
                                {/*<input onChange={this.handleAdress} type="text" name="address" id="addresas" className="form-control" placeholder="Vieta" />*/}
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleDate} type="date" name="date" id="date" className="form-control" placeholder="Renginio data" />
                                {/*<input type="date" onChange={(event) => this.setState({startDate: event.target.value}, console.log(event.target.value))}/>*/}
                                </div>
                            <div className="form-group">
                                <select value={this.state.category}
                                onChange={this.handleCategory}>
                                <option value="kategorija">Kategorija</option>
                                <option value="muzika">Muzika</option>
                                <option value="kinas">Kinas</option>
                                <option value="sportas">Sportas</option>
                                 <option value="teatras">Teatras</option>
                                 <option value="parodos">Parodos</option>
                                 <option value="festivaliai">Festivaliai</option>
                                </select> 
                            </div>
                            <button type="button" className="btn btn-danger btn-block" onClick={this.handleEventSubmit}>Įkelti</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
      </div>
      </div>
        )
    }
}