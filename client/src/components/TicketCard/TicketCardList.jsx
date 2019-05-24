import React from 'react';
import TicketCard from './TicketCard.jsx';

// eslint-disable-next-line
{/* i props paduodamas tickets tai eventu objektu listas, sukuriamas cardArray i kuri sudedam eventus*/}
const CardList = (props) =>{
    let {tickets} = props;
    if(typeof tickets === "undefined"){tickets = [];} //if undefined make an empty array
    else{tickets.sort(function(a, b){return a.price - b.price});} //sort tickets by price
    let limit = props.limit;
    if(limit === 0){limit = 10}

    const cardArray = [];
    for(let i = 0; i<tickets.length;i++){
        if(i+1 > limit){break;}
        if(tickets[i].sold === 1){continue;}
    cardArray.push(<TicketCard title= {tickets[i].title } price={tickets[i].price}  key={tickets[i].id_tickets}/>);
    }
    if(cardArray.length === 0){
        cardArray.push(<h3>Nėra parduodamų bilietų</h3>);
    }
    return(

        <div className="row justify-content-center">
            {cardArray}
        </div>

    );
}
export default CardList;