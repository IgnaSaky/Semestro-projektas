import React, { Component } from 'react';
import Navbar from '../components/Homepage/Navbar.jsx';
import Footer from '../components/Homepage/Footer.jsx';
import MapContainer from '../components/Homepage/MapContainer.jsx';
import SearchBar from '../components/Homepage/SearchBar.jsx';
import Background from '../containers/Background.jsx';

class home extends Component{
    render(){
        return(
        <div>

            <Background>
                <Navbar />
                <MapContainer/>
                <SearchBar/>
            </Background>
            <Footer />
        </div>
        );
    }
}
export default home;