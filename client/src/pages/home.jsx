import React, { Component } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
class home extends Component{
    render(){
        return(
        <div>
            <Navbar />
            
            <Footer />
        </div>
        );
    }
}
export default home;