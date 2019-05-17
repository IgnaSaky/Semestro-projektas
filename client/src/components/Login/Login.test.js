import React from 'react';
import { shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from './Login'
configure({adapter: new Adapter()});
// describe what we are testing
describe('<Login/>', () => {

    it('should render Login without throwing an error', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#loginForm').exists()).toBe(true);
    });

    it('renders a email input', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#email')).toHaveLength(1);
    });
    it('renders a password input', () => {
        expect(shallow(<Login />).find('#password').length).toEqual(1)
    })
});
describe('Email input', () => {
  
    it('should respond to change event and change the state of the Login Component', () => {
     
        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
     
        expect(wrapper.state('email')).toEqual('blah@gmail.com');
    });
});
describe('Password input', () => {
  
    it('should respond to change event and change the state of the Login Component', () => {
     
        const wrapper = shallow(<Login />);
         wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});
     
        expect(wrapper.state('password')).toEqual('cats');
    });
});