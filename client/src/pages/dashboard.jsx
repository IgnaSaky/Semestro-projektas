import React, { Component } from 'react'
import EventCard from '../components/EventCard/EventCard.jsx';
import Navbar from '../components/NavbarDark/NavbarDark.jsx';
import image1 from '../images/pic1.jpg';
import image2 from '../images/pic3.jpg';

export class dashboard extends Component {
  render() {
    return (
      <div>

          <Navbar/>
          <div className="text-center font-weight-bold m-3"> Renginiai </div>
          <hr></hr>
          <div className="container-fluid">
            <div className="row justify-content-center">
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
                <EventCard testImage={image1}  />  
                <EventCard testImage={image2}  />
            </div>
          </div>

      </div>
    )
  }
}

export default dashboard
