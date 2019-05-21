import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TicketSaving from '../TicketSaving/TicketSaving';
// describe what we are testing
import ReactDOM from 'react-dom';
import { exportAllDeclaration } from '@babel/types';
import { format } from 'util';

describe('Ticket Component', () => {

  it('it renders without crashing', () => {
    const wrapper = shallow(<TicketSaving/>);
     expect(wrapper.exists()).toBe(true);
     });
   });

  // make our assertion and what we expect to happen 
  it('should render without throwing an error', () => {
    const wrapper = shallow(<TicketSaving/>);
    expect(wrapper.find('#TicketForm').exists()).toBe(true);
  });

  it('renders a title input', () => {
    const wrapper = shallow(<TicketSaving/>);
    expect(wrapper.find('#title')).toHaveLength(1);
});
it('renders a description input', () => {
  const wrapper = shallow(<TicketSaving/>);
  expect(wrapper.find('#description')).toHaveLength(1);
});
it('renders a price input', () => {
  const wrapper = shallow(<TicketSaving/>);
  expect(wrapper.find('#price')).toHaveLength(1);
});
it('renders a file input', () => {
  const wrapper = shallow(<TicketSaving/>);
  expect(wrapper.find('#file')).toHaveLength(1);
});

describe('Title input', () => {
  it('should respond to change event and change the state of the TicketSaving Component', () => {
      const wrapper = shallow(<TicketSaving />);
      wrapper.find('#title').simulate('change', {target: {name: 'title', value: 'Granatos Live'}});
      expect(wrapper.state('title')).toEqual('Granatos Live');
  });
});

describe('Description input', () => {
  it('should respond to change event and change the state of the TicketSaving Component', () => {
      const wrapper = shallow(<TicketSaving />);
      wrapper.find('#description').simulate('change', {target: {name: 'description', value: 'Vasaros festivalis'}});
      expect(wrapper.state('description')).toEqual('Vasaros festivalis');
  });
});

describe('Price input', () => {
  it('should respond to change event and change the state of the TicketSaving Component', () => {
      const wrapper = shallow(<TicketSaving />);
      wrapper.find('#price').simulate('change', {target: {name: 'price', value: '54.3'}});
      expect(wrapper.state('price')).toEqual('54.3');
  });
});

// describe('File input', () => {
//   it('should respond to change event and change the state of the TicketSaving Component', () => {
//       const wrapper = shallow(<TicketSaving />);
//       wrapper.find('#file').simulate('change', {target: {name: 'file', value: 'C:\Users\MASTER\Desktop\detalus_grafikas2019v2'}});
//       expect(wrapper.state('file')).toEqual('C:\Users\MASTER\Desktop\detalus_grafikas2019v2');
//   });
// });