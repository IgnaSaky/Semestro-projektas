import React, { Component } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MapContainer from '../components/MapContainer.jsx';

class home extends Component{
    render(){
        return(
        <div>
            <Navbar />
            <MapContainer/>
            <Footer />
        </div>
        );
    }
}
export default home;