import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Congrats from './index';
import { findByTestAttr, checkProps as expectPropWarningToBeUndefined } from '../../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props={success: true}) => {
   return shallow(<Congrats {...props} />)
}

test('should render without crashing', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({success: false});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('')
})

test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup();
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
  const expectedProps = {success: true};
  expectPropWarningToBeUndefined(Congrats, expectedProps);
})