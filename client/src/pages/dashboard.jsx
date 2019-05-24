import React, { Component } from 'react'

import Navbar from '../components/Homepage/Navbar.jsx';
import Background from '../containers/Background.jsx';
import CardList from '../components/EventCard/EventCardList';
import SearchBar from '../components/Homepage/SearchBar.jsx';
import SideGenres from '../components/SideGenres/SideGenres.jsx';
import EventCard from '../components/EventCard/EventCard';


export class dashboard extends Component {
  constructor(){
    super();
    this.state = 
    {
        events: [],
        limit: 10
    }
}
  componentDidMount(){
    const { match: { params } } = this.props; 
    const city = params.city;
    if(city === "all"){
      fetch('http://localhost:5000/api/events')
    .then(response =>response.json())
    .then( users =>{
        this.setState({events: users})
    });}
    else{
      fetch('http://localhost:5000/api/events/city/'+city)
      .then(response =>response.json())
      .then( users =>{
          this.setState({events: users})
      });
    }
  }
  changeGenre = (genre) => {
    fetch('http://localhost:5000/api/events' + genre)
    .then(response =>response.json())
    .then( users =>{
        this.setState({events: users})
    }); 
  }
  changeLimit= (limit) => {
    this.setState({limit: limit});
    console.log(this.state.limit);
  }
  render() {
    return (
      <div>
          <Background>
            <Navbar/>
            <h1 className="text-center font-weight-bold m-5 p-5"style={{color:"White"}}>Renginiai</h1>
          <SearchBar/>
          </Background>

          <div className="row m-2">
           <div className="col-md-3 col-sm-5 col-12"> <SideGenres genreChange={this.changeGenre} /></div>
            <div className="col-md-9 col-sm-7 col-12">
              <CardList events={this.state.events} limit={this.state.limit} changeLimit={this.changeLimit}/>
              <div className="container-fluid">
                <div className="row justify-content-center">
                <div onClick={ () =>this.changeLimit(this.state.limit + 10)}><EventCard title="Load more" description="........."/></div>
                </div>
              </div>
             
            </div>
          </div>

      </div>
    )
  }
}

export default dashboard
