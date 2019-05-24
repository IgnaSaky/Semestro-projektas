import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
    constructor (props){
        super(props);
        
        this.state={
            suggestions: [],
            text: '',
            items: [],
        };
    }
    isLetter(str){
        return /^[0-9a-zA-Z]+$/.test(str);
    }
    onTextChanged = (e) => {
        let value=e.target.value;
        let suggestions=[];
        if(value.length>0){
            if(this.isLetter(value)){
                const regex=new RegExp(`^${value}`, 'i');
                suggestions=this.state.items.sort().filter(v => regex.test(v));
            } 
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
            {suggestions.map((item) => <li className="suggestion" key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>    
        );
    }
    suggestionSelected(value){
        this.setState(()=>({
            text:value,
            suggestions:[],
        }));
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/AutoTextCompletion')
        .then(response => response.json())
        .then(users => {
            for(let i = 0; i< users.length; i++){
                this.state.items.push(users[i].title);
            }

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