import React from 'react';
import ReactDOM from 'react-dom';
import EventCard from './EventCard.jsx';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Route } from "react-router-dom";

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(shallow(
    <Router>
        <div>
         <EventCard title={"aaa"} description ={"test"}/>
        </div>
    </Router>

   ), div);
});
