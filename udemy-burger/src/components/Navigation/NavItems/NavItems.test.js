// Unit testing with Jest and Enzyme
// https://jestjs.io/docs/en/getting-started
// https://airbnb.io/enzyme/docs/api/

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({
    adapter: new Adapter()
});

describe('Description of the test bundle - <NavItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    });

    it('should render two <NavItems /> elements if not authenticated', () => {
        // Important! Not a JSX Item!
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render three <NavItems /> elements if authenticated', () => {
        // wrapper = shallow(<NavItems isAuth />);
        wrapper.setProps({ isAuth: true });

        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render a Log Out <NavItem /> element if authenticated', () => {
        wrapper.setProps({ isAuth: true });

        // contains = Enzyme
        // toEqual = Jest
        // contains must be exactly the JSX Element to find
        expect(wrapper.contains(<NavItem url="/logout" exact={true}>Log Out</NavItem>)).toEqual(true);
    });
});
