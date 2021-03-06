import React from 'react';
import EventCard from './EventCard.jsx';

// eslint-disable-next-line
{/* i props paduodamas events tai eventu objektu listas, sukuriamas cardArray i kuri sudedam eventus*/}
const CardList = (props) =>{
    let {events} = props;
    if(typeof events === "undefined"){events = [];} 
    let limit = props.limit;
    if(limit === 0){limit = 10}

    const cardArray = [];
    for(let i = 0; i<events.length;i++){
        if(i+1 > limit){break;}
    cardArray.push(<EventCard title= {events[i].title } description={events[i].description}  key={events[i].id_spectacle} id={events[i].id_spectacle}/>);
    }
    if(cardArray.length === 0){
        cardArray.push(<h3 key={cardArray.length}>Pagal jūsų kriterijus Bilietu nerasta</h3>);
    }
    return(
    <div className="container-fluid">
        <div className="row justify-content-center">
            {cardArray}
        </div>
    </div>
    );
}
export default CardList;