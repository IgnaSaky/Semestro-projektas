import React from 'react'
import './css/Profile.css';

/*import { connect } from 'react-redux';
import PropTypes from 'prop-types';*/

function Jumbtron(props) {
  
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron img">
            <h1 className="display-4">Sveiki, { props.user.username}</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4"></hr>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a className="btn btn-primary btn-md ml-3" href="/ticketSaving" role="button">Įkelti Bilietą</a>
            
            <button type="button" className="btn btn-primary ml-3" data-toggle="modal" data-target="#exampleModal">
              Keisti Slaptažodį
            </button>
        </div>
      </div>
    </div>
  )
}

export default Jumbtron;