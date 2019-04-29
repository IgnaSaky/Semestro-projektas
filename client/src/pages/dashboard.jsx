import React, { Component } from 'react'

import Navbar from '../components/Homepage/Navbar.jsx';
import Background from '../containers/Background.jsx';
import CardList from '../components/EventCard/EventCardList';
import SearchBar from '../components/Homepage/SearchBar.jsx';


export class dashboard extends Component {
  constructor(){
    super();
    this.state = 
    {
        events: []
    }
}
  componentDidMount(){
    fetch('http://localhost:5000/api/events')
    .then(response =>response.json())
    .then( users =>{
        this.setState({events: users})
    })
}
  render() {
    return (
      <div>
          <Background>
            <Navbar/>
            <h1 className="text-center font-weight-bold m-5 p-5"style={{color:"White"}}> Renginiai </h1>
          <SearchBar/>
          </Background>
          <div className="row">
            <div className="col-11"><CardList events={this.state.events} limit={10}/></div>
          </div>

      </div>
    )
  }
}

export default dashboard
