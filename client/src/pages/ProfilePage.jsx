import React, { Component } from 'react'
import NavBar from '../components/Homepage/Navbar';
import Jumbotron from '../components/Profile/Jumbtron'
import { getFromStorage } from '../utils/storage';
import Modal from '../components/Profile/Modal';

export class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        const userFromStorage = getFromStorage('user');
        console.log(userFromStorage);
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
      </div>
    )
  }
}

export default ProfilePage

