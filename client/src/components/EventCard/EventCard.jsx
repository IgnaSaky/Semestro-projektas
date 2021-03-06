import React from 'react'
import {Link} from 'react-router-dom';
import './EventCard.css';

function EventCard(props) {

  let {title, description, id} = props;
  if(typeof title === 'undefined'){
    title = "";
  }
  if(typeof description === 'undefined'){
    description = "";
  }
  return (
    <Link to={`/event/${id}`} className="card shadow m-1 cardStyle col-11" style={{width: '18rem', color:'black'}}>
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


