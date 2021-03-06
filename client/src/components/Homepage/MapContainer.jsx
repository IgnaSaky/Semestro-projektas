import React, { Component} from 'react';
import './MapContainer.css';
import image from '../../images/Lietuva.png';
import {Link} from 'react-router-dom';

class MapContainer extends Component{
    render(){
        return(
            <div className="imageLt text-center">
                {/*<img src={image} usemap="#image-map" alt="lietuvosImg" className="img-fluid"/>

                <map name="image-map">
                    <area target="" alt="kaunas" title="kaunas" href="" coords="311,302,10" shape="circle"/>
                    <area target="" alt="vilnius" title="vilnius" href="" coords="462,343,10" shape="circle"/>
                    <area target="" alt="siauliai" title="siauliai" href="" coords="246,103,10" shape="circle"/>
                    <area target="" alt="klaipeda" title="klaipeda" href="" coords="15,140,10" shape="circle"/>
                  </map>
                  More responsive way --> */}

                <figure id="projectsvg">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="-300 0 1270 1000" preserveAspectRatio="xMidYMin" >
                    <image width="635" height="500" href={image} />
                        <g className="hover_group" opacity="0">
                            <Link to="/dashboard/Kaunas">
                                <circle cx="311" cy="302" r="13" opacity="0.2" fill="#FFFFFF"></circle>{/*kaunas */}
                            </Link>
                        </g>
                        <g className="hover_group" opacity="0">
                            <Link to="/dashboard/Vilnius">
                                <circle cx="462" cy="343" r="13" opacity="0.2" fill="#FFFFFF"></circle>{/*vilnius */}
                            </Link>
                        </g>
                        <g className="hover_group" opacity="0">
                            <Link to="/dashboard/Siauliai">
                                <circle cx="246" cy="103" r="13" opacity="0.2" fill="#FFFFFF"></circle>{/*siauliai */}
                            </Link>
                        </g>
                        <g className="hover_group" opacity="0">
                            <Link to="/dashboard/Klaipeda">
                                <circle cx="15" cy="140" r="13" opacity="0.2" fill="#FFFFFF"></circle>{/*klaipeda */}
                            </Link>
                        </g>
                    </svg>
                </figure>
            </div>
        )
    }
}
export default MapContainer;