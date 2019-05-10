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
                <div onClick={ () =>this.props.genreChange("/genre/lazy")}>Lazy</div>
            </li>
            <li className=" card shadow col-12">
               <div  onClick={ () => this.props.genreChange("/genre/Test")}>Test</div>
            </li>
            <li className=" card shadow col-12">
                <div >Genre</div>
            </li>
            <li className=" card shadow col-12">
                <div >Genre</div>
            </li>
            <li className=" card shadow col-12">
                <div >Genre</div>
            </li>
            <li className=" card shadow col-12">
                <div >Genre</div>
            </li>
            <li className=" card shadow col-12">
                <div >Genre</div>
            </li>
        </ul>
    </div>
    )
  }
}

export default SideGenres
