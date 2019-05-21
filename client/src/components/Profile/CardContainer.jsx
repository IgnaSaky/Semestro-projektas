import React from 'react'
import './css/Profile.css';
import FakeEventCard from '../EventCard/FakeEventCard';

function CardContainer(props) {
  return (
    <div className='container-fluid'>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Parduodami</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Parduoti</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Nusipirkti</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className='card-deck'>
            <FakeEventCard/>
            <FakeEventCard/>
            <FakeEventCard/>
          </div>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
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
