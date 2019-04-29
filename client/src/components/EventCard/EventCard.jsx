import React from 'react'
import {Link} from 'react-router-dom';
import './EventCard.css';

function EventCard(props) {
  const {title, description} = props;
  return (
    <Link to="/dashboard" className="card shadow m-1 cardStyle" style={{width: '18rem', color:'black'}}>
      <div className="overlay">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description.substr(0, 50)}...</p>
        </div>
      </div>
    </Link>

  )
}

export default EventCard
