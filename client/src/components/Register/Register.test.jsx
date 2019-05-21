import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Register } from '../Register/Register';
// describe what we are testing
import ReactDOM from 'react-dom';
import { exportAllDeclaration } from '@babel/types';
import { format } from 'util';

describe('Register Component', () => {

  it('it renders without crashing', () => {
    const wrapper = shallow(<Register />);
     expect(wrapper.exists()).toBe(true);
     });
   });

  // make our assertion and what we expect to happen 
  it('should render without throwing an error', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('#registerForm').exists()).toBe(true);
  });

  it('renders a username input', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('#username')).toHaveLength(1);
});
it('renders a email input', () => {
  const wrapper = shallow(<Register/>);
  expect(wrapper.find('#email')).toHaveLength(1);
});
it('renders a password input', () => {
  const wrapper = shallow(<Register/>);
  expect(wrapper.find('#password')).toHaveLength(1);
});
it('renders a password2 input', () => {
  const wrapper = shallow(<Register/>);
  expect(wrapper.find('#password2')).toHaveLength(1);
});

describe('Username input', () => {
  it('should respond to change event and change the state of the Register Component', () => {
      const wrapper = shallow(<Register />);
      wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'Antanas'}});
      expect(wrapper.state('username')).toEqual('Antanas');
  });
});

describe('Email input', () => {
  it('should respond to change event and change the state of the Register Component', () => {
      const wrapper = shallow(<Register />);
      wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'antanas@gmail.com'}});
      expect(wrapper.state('email')).toEqual('antanas@gmail.com');
  });
});

describe('Password input', () => {
  it('should respond to change event and change the state of the Register Component', () => {
      const wrapper = shallow(<Register />);
      wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'antanas1'}});
      expect(wrapper.state('password1')).toEqual('antanas1');
  });
});

describe('Password2 input', () => {
  it('should respond to change event and change the state of the Register Component', () => {
      const wrapper = shallow(<Register />);
      wrapper.find('#password2').simulate('change', {target: {name: 'password2', value: 'antanas1'}});
      expect(wrapper.state('password2')).toEqual('antanas1');
  });
});