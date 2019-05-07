import React, { Component } from 'react'
import NavBar from '../components/Homepage/Navbar';
import Jumbotron from '../components/Profile/Jumbtron'
import Modal from '../components/Profile/Modal';
import Footer from '../components/Homepage/Footer';
//redux 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class ProfilePage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated,user } = this.props.auth;
    
    return (
      <div>
        <NavBar/>
        <Jumbotron user={user}/>
        <Modal isAuthenticated={isAuthenticated} user={user}/>
        <div style={{height:'500px'}}>
            Čia gal rodyti savo įkeltą bilietą/-us, kad būtų kažkiek didesnis puslapis ? Nzn ką dar galima
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProfilePage);

