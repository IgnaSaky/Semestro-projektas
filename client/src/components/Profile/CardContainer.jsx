import React from 'react'
import './css/Profile.css';
import FakeEventCard from '../EventCard/FakeEventCard';

function CardContainer(props) {
  return (
    <div className='container-fluid'>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Parduodami</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Parduoti</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Nusipirkti</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className='card-deck'>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
          </div>
          <div className='card-deck'>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
          </div>
          
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className='card-deck'>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
          </div>
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <div className='card-deck'>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardContainer;
