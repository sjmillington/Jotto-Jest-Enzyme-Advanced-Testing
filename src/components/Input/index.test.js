import Input, { UnconnectedInput } from './';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../test/testUtils';

const setup = (initialState={}) => {
   const wrapper = shallow(<Input store={storeFactory(initialState)} />).dive().dive();
   return wrapper;
}


describe('render', () => {

  describe('word has not been guessed', () => {

    let wrapper;
    const initialState = { success: false }
    beforeEach(() => {
      wrapper = setup(initialState);
    })

    test('renders component without error', () => {
      
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1);

    });

    test('renders the input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(1);

    })

    test('renders the submit button', () => {
      const button = findByTestAttr(wrapper, 'submit-button')
      expect(button.length).toBe(1);

    })

  })

  describe('word has been guessed', () => {

    let wrapper;
    const initialState = { success: true }
    beforeEach(() => {
      wrapper = setup(initialState);
    })

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1);
    });

    test('does not render the input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.length).toBe(0);

    })

    test('does not render the submit button', () => {
      const button = findByTestAttr(wrapper, 'submit-button')
      expect(button.length).toBe(0);
    })

  })

})

describe('redux props', () => {
  test('has success state as a prop', () => {
    const success = true;
    const wrapper = setup({ success })
    
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success)
  })

  test('guessWord action creator is a function prop', () => {
    const wrapper = setup();

    const guessWordProp = wrapper.instance().props.guessWord

    expect(guessWordProp).toBeInstanceOf(Function)
  })
})

describe('guessWord', () => {

  let wrapper;
  let guessWordMock;

  const guessedWord = 'train';

  beforeEach(() => {

    guessWordMock = jest.fn();
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} /> )

    //add value to input
    wrapper.setState({ currentGuess: guessedWord })

    const button = findByTestAttr(wrapper, 'submit-button');
    button.simulate('click', { preventDefault() {}});

  })

  test('calling guessWord on submit', () => {
    const numberOfGuessWordCalls = guessWordMock.mock.calls.length;
    expect(numberOfGuessWordCalls).toBe(1);
  
  });

  test('calls `guessWord` with input value as argument', () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord)
  });

  test('clears input box after guess', () => {
    const newInputBoxValue = wrapper.state('currentGuess')
    expect(newInputBoxValue).toBe('')
  })
  

})


describe('update state', () => {

})