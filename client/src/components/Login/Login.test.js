import React from 'react';
import { shallow, mount, render,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login'
import { login } from '../../actions/authActions';
configure({adapter: new Adapter()});
// describe what we are testing
describe('<Login/>', () => {
    it('should render without throwing an error', () => {
        /*const wrapper = shallow(<Login />).dive();
        expect(wrapper.find(login)).to;*/
    });
});