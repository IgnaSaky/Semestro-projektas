import React, { Component } from 'react'
import NavBar from '../components/Homepage/Navbar';
import Jumbotron from '../components/Profile/Jumbtron'
import Modal from '../components/Profile/Modal';
import Footer from '../components/Homepage/Footer';
import CardContainer from '../components/Profile/CardContainer';
//redux 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class ProfilePage extends Component {

  render() {
    const { user , isAuthenticated} = this.props.auth;

    if (!isAuthenticated) {
      return(<p>Prisijunkite</p>);
    }
    const titleProps = {
      text: "Dummy",
      description: 'Bacon ipsum dolor amet andouille pastrami filet mignon frankfurter beef ribs strip steak. Bresaola doner landjaeger, turkey shoulder bacon biltong tail corned beef burgdoggen cow. Sausage bacon spare ribs, burgdoggen landjaeger corned beef prosciutto.'
    }
    return (
      <div>
        <NavBar/>
        <Jumbotron user={user}/>
        <h1 className='text-center m-5' style={{textShadow: '3px 3px 4px #ccc',letterSpacing:'8px'}}>BILIETAI</h1>
        <CardContainer/>
        <Footer/>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProfilePage);

