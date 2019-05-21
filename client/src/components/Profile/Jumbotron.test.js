import React from 'react';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Jumbotron from './Jumbtron';
import { wrap } from 'module';
import Modal from './Modal';
configure({adapter: new Adapter()});

describe('<Jumbotron/>', () => {
    const user = {
        user: {
            username: "marijus",
        email: "m.jenulis@gmail.com"
        }
    };

    it("should render Jumbotron without failing", () => {
        const wrapper = shallow(<Jumbotron user={user}/>);
        expect(wrapper.find('.jumbotron').exists()).toBe(true);
    });
    /*it("should pass user object through props", () => {
        const wrapper = shallow(<Jumbotron user={user}/>);
        expect(wrapper.props().user).to.equal(user.user);
    });*/
    it("should render Modal for password change", () => {
        const wrapper = shallow(<Jumbotron user={user}/>);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});