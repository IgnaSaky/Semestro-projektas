import React, {Component} from 'react';
import './SearchBar.css';



class SearchBar extends Component{
    render(){
        return(
        <div className="container containerFooter pr-5 pl-5">
            <div className="active-pink-3 active-pink-4 pb-5 form-row">
                <input className="form-control col-10" type="text" placeholder="Search" aria-label="Search"/>
                <button type="submit" className="search-button btn btn-primary col-2">⌕</button>
            </div>    
        </div>
        );
    }
}
export default SearchBar;