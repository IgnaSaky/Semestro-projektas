import React from 'react';
import eventCard from './eventCard.jsx';

{/* i props paduodamas events tai eventu objektu listas, sukuriamas cardArray i kuri sudedam eventus*/}
const CardList = (props) =>{
    const {events} = props; 
    let limit = props.limit;
    if(limit === 0){limit = 10}

    const cardArray = [];
    for(let i = 0; i<events.length;i++){
        if(i+1 > limit){break;}
        cardArray.push(<eventCard key={events[i].id} obj={events[i]}/>);
    }
    return(
    <div>
        {cardArray}
    </div>
    );
}
export default CardList;