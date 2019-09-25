import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkPropErrorUndefined } from '../../../test/testUtils';
import GuessedWord from './index'

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3}]
}

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props}
  return shallow(<GuessedWord {...setupProps} />)
}

test('does not throw warning with expected props', () => {
  checkPropErrorUndefined(GuessedWord, defaultProps);
})

describe('if there are no words guessed', () => {
  
  const noGuessedWordsProps = {guessedWords: []}

  let wrapper = null;

  beforeEach(() => {

    wrapper = setup(noGuessedWordsProps);

  })


  
  test('renders without error', () => {

    const component = findByTestAttr(wrapper, 'component-guessed-words')
    expect(component.length).toBe(1);

  });

  test('renders instructions to guess a word', () => {

    const instructions = findByTestAttr(wrapper, 'guess-instructions')  
    expect(instructions.text().length).not.toBe(0);

  })

})

describe('if there are words guessed', () => {

  const guessedWords = [
    {
      guessedWord: 'Lucky',
      letterMatchCount: 3
    },
    {
      guessedWord: 'Party',
      letterMatchCount: 3
    },
    {
      guessedWord: 'Train',
      letterMatchCount: 3
    },
  ]

  let wrapper = null;

  beforeEach(() => {

    wrapper = setup({ guessedWords });

  })

  test('renders without an error', () => {

    const component = findByTestAttr(wrapper, 'component-guessed-words')
    expect(component.length).toBe(1);

  });

  test('renders the guessed word section', () => {

    const component = findByTestAttr(wrapper, 'guessed-words')
    expect(component.length).toBe(1);

  });

  test('renders the correct number of guessed words', () => {

    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);

  });

})