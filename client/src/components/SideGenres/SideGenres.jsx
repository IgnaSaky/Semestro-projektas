import React, { Component } from 'react'
import './SideGenres.css';

export class SideGenres extends Component {
  render() {
    return (
        <div id="sidebar-wrapper container-fluid">
        <ul className="sidebar-nav row justify-content-center">
            <li className="sidebar-brand card shadow col-12">
                <a href="#">
                    Start Bootstrap
                </a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Dashboard</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Shortcuts</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Overview</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Events</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">About</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Services</a>
            </li>
            <li className=" card shadow col-12">
                <a href="#">Contact</a>
            </li>
        </ul>
    </div>
    )
  }
}

export default SideGenres
