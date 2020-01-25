// Unit testing with Jest and Enzyme
// https://jestjs.io/docs/en/getting-started
// https://airbnb.io/enzyme/docs/api/

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receinving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0
            }
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
