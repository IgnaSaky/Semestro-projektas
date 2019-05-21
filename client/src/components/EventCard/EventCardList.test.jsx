import React from 'react';
import ReactDOM from 'react-dom';
import EventCardList from './EventCardList.jsx';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Route } from "react-router-dom";

configure({ adapter: new Adapter() });


it('Event card list renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render((
    <Router>
        <div>
         <EventCardList/>
        </div>
    </Router>

   ), div);
});

it('Event card list finds a container', () => {
    const editor =shallow(<EventCardList/>);
    expect(editor.find('.container-fluid').length).toEqual(1);
});

// it('Event card renders the html output correctly', () => {
//     const editor =shallow(<EventCard />);
//     const realOutput = editor.find('.card').html();
//     expect("").toEqual(realOutput);
// })