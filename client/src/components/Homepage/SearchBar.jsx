import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
    constructor (props){
        super(props);
       /* this.items=[
            "Eurolyga: Zalgiris-Fenerbahce",
            "Eurolyga: Zalgiris-Panathinaikos",
            "Eurolyga: Zalgiris-CSKA",
            "Granatos",
            "Eminemas",
            "Auksiniai svogūnai",
            "Barakiada",
            "Teatralas",
            "Auksinis lietus"
        ]; */
        /*fetch('http://localhost:5000/api/autoTextCompletion')
        .then(response => response.json())
        .then(users => {
            this.items=users;
        });*/
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
            <ul className="suggestion-container">
            {suggestions.map((item) => <li className="suggestion" onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>    
        );
    }
    suggestionSelected(value){
        this.setState(()=>({
            text:value,
            suggestions:[],
        }));
    }
    ComponentDidMount(){
        fetch('http://localhost:5000/api/AutoTextCompletion')
        .then(response => response.json())
        .then(users => {
            //this.items=users;
            this.setState({suggestions: users})
        });
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