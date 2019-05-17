import React from 'react';
import ReactDOM from 'react-dom';
import EventCard from './EventCard.jsx';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Route } from "react-router-dom";

configure({ adapter: new Adapter() });


it('Event card renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render((
    <Router>
        <div>
         <EventCard/>
        </div>
    </Router>

   ), div);
});

it('Event card renders title and description areas', () => {
    const editor =shallow(<EventCard title={"aa"}/>);
    expect(editor.find('.card-title').length).toEqual(1);
    expect(editor.find('.card-text').length).toEqual(1);
});

// it('Event card renders the html output correctly', () => {
//     const editor =shallow(<EventCard />);
//     const realOutput = editor.find('.card').html();
//     expect("").toEqual(realOutput);
// })