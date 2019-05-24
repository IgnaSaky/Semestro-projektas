import React, { Component } from 'react'
import Navbar from '../components/Homepage/Navbar.jsx';
import '../containers/background.css';
import TicketCardList from '../components/TicketCard/TicketCardList';

export class Event extends Component {
    constructor(props){
        super(props);
        this.state ={
            params: [],
            tickets:[],
            eventParams:{
                title:"Event Not Found",
                date:"",
                description:"",
                address:"",
            }
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props; //localhost:5000/api/events/tickets/0
        this.setState({params: params});
        fetch(`http://localhost:5000/api/events/tickets/${params.id}`)
        .then(response =>response.json())
        .then( tickets =>{
            this.setState({tickets: tickets})
        });
        fetch(`http://localhost:5000/api/events/event/${params.id}`)
        .then(response =>response.json())
        .then( events =>{
            if(events.length !== 0){
                this.setState({eventParams: events[0]})
            }

        });

    }
    render() {
        return (
            <div>
                <Navbar isDark={true} />
                <div className="blackBackground">                
                    <div className="container">
                        <h1 className="text-center font-weight-bold p-3 pt-5"style={{color:"White"}}>{this.state.eventParams.title}</h1>
                        <h2 className="m-1 p-1"style={{color:"White"}}>Renginio data: {this.state.eventParams.date.substring(0,10)}</h2>
                        <h4 className="m-1 p-1"style={{color:"White"}}>Vieta: {this.state.eventParams.adress}</h4>
                        <h5 className="m-1 p-1 pb-4" style={{color:"White"}}>Aprašymas: {this.state.eventParams.description}</h5>
                    </div>
                </div>
                <div className="container">
                    <h2 className="mt-3">Parduodami bilietai:</h2>
                    <TicketCardList tickets={this.state.tickets}/>
                </div>


            </div>
        )
    }
}

export default Event
