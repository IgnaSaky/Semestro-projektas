import React from 'react'
import {Link} from 'react-router-dom';
import './TicketCard.css';

function TicketCard(props) {

  let {title, price} = props;
  if(typeof title === 'undefined'){
    title = "";
  }
  if(typeof price === 'undefined'){
    price = "";
  }
  return (
    <Link className="card shadow m-1 cardStyle col-12" style={{width: '18rem', color:'black'}}>
      <div className="overlay">
          <div className="row justify-content-center">
            <div className="card-body col-9">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Kaina: {price}</p>
            </div>
            <div className="col-2 text-center mt-4 mb-4 pt-2 border border-dark rounded ticketButton">Pirkti</div>
          </div>
      </div>
    </Link>

  )
}

export default TicketCard


