import React, { Component } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MapContainer from '../components/MapContainer.jsx';
import SearchBar from '../components/SearchBar.jsx';
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