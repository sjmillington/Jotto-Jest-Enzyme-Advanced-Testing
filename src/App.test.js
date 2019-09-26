import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from './test/testUtils';
import ReactDOM from 'react-dom';
import App, { UnconnectedApp } from './App';

const setup = (initialState={}) => {
  return shallow(<App store={storeFactory(initialState)} />).dive().dive()
}

it('renders without crashing', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);

});



describe('redux props', () => {

  test('it gets success prop from redux', () => {

    const success = true;
    const wrapper = setup({ success })
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);

  })

  test('it gets secretWord prop from redux', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord })
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test('it gets the guessedWords prop from redux', () => {
    const guessedWords = [{guessedWord: 'train', letterMatchCount: 3}]
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBeInstanceOf(Array);

  })

  test('it gets the getSecretWord action from redux', () => {

    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
    
  })

})

test('getSecretWord runs on app mount', () => {
  const getSecretWordMock = jest.fn();

  //app setup
  const wrapper = shallow(<UnconnectedApp getSecretWord={getSecretWordMock} guessedWords={[]} success={true} />);

  //run lifecycle method
  wrapper.instance().componentDidMount();

  //check to see if mock ran

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);

})