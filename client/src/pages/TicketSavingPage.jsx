import React, {Component} from 'react';
import TicketSaving from '../components/TicketSaving/TicketSaving.jsx';
import NavBar from '../components/Homepage/Navbar';


class TicketSavingPage extends Component {
    render() {
      return (
        <div>
            <NavBar/>
            <TicketSaving/>
        </div>
      );
    }
}
export default TicketSavingPage;