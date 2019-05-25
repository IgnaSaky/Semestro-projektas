import React, { Component } from 'react'
import './SideGenres.css';

export class SideGenres extends Component {
  render() {
    return (
        <div id="sidebar-wrapper container-fluid" className="sticky">
        <ul className="sidebar-nav row justify-content-center">
            <li className="sidebar-brand card shadow col-12">
            <div onClick={ () =>this.props.genreChange("")}>
                    Visi renginiai
             </div>
            </li>
            <li className=" card shadow col-12">
                <div onClick={ () =>this.props.genreChange("/genre/Muzika")}>Muzika</div>
            </li>
            <li className=" card shadow col-12">
               <div onClick={ () => this.props.genreChange("/genre/Kinas")}>Kinas</div>
            </li>
            <li className=" card shadow col-12">
                <div onClick={ () => this.props.genreChange("/genre/Sportas")}>Sportas</div>
            </li>
            <li className=" card shadow col-12">
                <div onClick={ () => this.props.genreChange("/genre/Teatras")}>Teatras</div>
            </li>
            <li className=" card shadow col-12">
                <div onClick={ () => this.props.genreChange("/genre/Parodos")}>Parodos</div>
            </li>
            <li className=" card shadow col-12">
                <div onClick={ () => this.props.genreChange("/genre/Festivaliai")}>Festivaliai</div>
            </li>
        </ul>
    </div>
    )
  }
}

export default SideGenres
