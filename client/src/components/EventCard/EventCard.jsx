import React from 'react'
import {Link} from 'react-router-dom';
import './EventCard.css';

function EventCard(props) {
  const testImage = props.testImage;
  return (
    <div className="card shadow m-2 cardStyle" style={{width: '18rem',}}>
      <div className="overlay">
        <img className="card-img-top" src={testImage} alt=""/>
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. lorem</p>
            <Link to="/dashboard" className="btn btn-custom cardButton">BUYBUYBUY</Link>
        </div>
      </div>
    </div>

  )
}

export default EventCard
