import React, {Component} from 'react';
import './SearchBar.css';



class SearchBar extends Component{
    constructor (props){
        super(props);
        this.items=[
            "Žalgiris",
            "Granatos",
            "Eminemas",
            "Auksiniai svogūnai",
            "Barakiada",
            "Teatralas",
            "Auksinis lietus"
        ];
        this.state={
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const value=e.target.value;
        let suggestions=[];
        if(value.length>0){
            const regex=new RegExp(`^${value}`, 'i');
            suggestions=this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions, text:value}));
    }
    renderSuggestions (){
        const {suggestions}=this.state;
        if(suggestions.length===0){
            return null;
        }
        return (
            <ul>
            {suggestions.map((item) => <li>{item}</li>)}
            </ul>    
        );
    }
    render(){
        const {text}=this.state;
        return(
        <div className="container containerFooter pr-5 pl-5">
            <div className="active-pink-3 active-pink-4 pb-5 form-row">
                <input value={text} className="form-control col-10" type="text" placeholder="Search" aria-label="Search" onChange={this.onTextChanged}/>
                <button type="submit" className="search-button btn btn-primary col-2">⌕</button>
                {this.renderSuggestions()}
            </div>
        </div>
        );
    }
}
export default SearchBar;