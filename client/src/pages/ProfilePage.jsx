import React, { Component } from 'react'
import NavBar from '../components/Homepage/Navbar';
import Jumbotron from '../components/Profile/Jumbtron'
import { getFromStorage } from '../utils/storage';
import Modal from '../components/Profile/Modal';
import Footer from '../components/Homepage/Footer';

export class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidlMount(){
        const userFromStorage = getFromStorage('user');
        if(userFromStorage){
            this.setState({
                user: userFromStorage
            });
        }
    }
  render() {
    return (
      <div>
        <NavBar/>
        <Jumbotron user={this.state.user}/>
        <Modal/>
        <div style={{height:'500px'}}>
            Čia gal rodyti savo įkeltą bilietą/-us, kad būtų kažkiek didesnis puslapis ? Nzn ką dar galima
        </div>
        <Footer/>
      </div>
    )
  }
}

export default ProfilePage

