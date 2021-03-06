import React from 'react'
import './css/Profile.css';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Jumbtron extends React.Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="container-fluid">
          <div className="jumbotron img">
              <h1 className="display-4">Sveiki, { user.user.username }</h1>
              <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr className="my-4"></hr>
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <a className="btn btn-primary btn-md ml-3 mr-3" href="/ticketSaving" role="button">Įkelti Bilietą</a>
              <Modal user={user}></Modal>
              
          </div>
        </div>
      </div>
    )
  }
  
}
Jumbtron.propTypes = {
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Jumbtron);