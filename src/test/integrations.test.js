import { storeFactory } from './testUtils';
import { guessWord } from '../store/actions';
import guessedWord from '../store/reducers/guessedWord';

describe('guessWord actions dispatcher', () => {

  const secretWord = 'party';

  const unsuccesfulGuess = 'train';

  describe('no guessed words', () => {

    let store;

    const initialState = { secretWord };

    beforeEach(() => {
      store = storeFactory(initialState);
    })
    
    test('updates state correctly for unsuccesful guess', () => {
      store.dispatch(guessWord(unsuccesfulGuess));

      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
           guessedWord: unsuccesfulGuess, 
           letterMatchCount: 3 
          }]
      }

      const newState = store.getState();

      expect(newState).toEqual(expectedState);

    })

    test('updates state correctly for succesful guess', () => {

      store.dispatch(guessWord(secretWord));

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }

      const newState = store.getState();

      expect(newState).toEqual(expectedState);
      
    })

  })

  describe('some guessed words', () => {

    const alreadyGuessedWords = [{
      guessedWord: 'agile',
      letterMatchCount: 1
    }]

    const initialState = { 
      secretWord ,
      guessedWords: alreadyGuessedWords
    };

    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    })

    test('updates state correctly for unsuccesful guess', () => {

      store.dispatch(guessWord(unsuccesfulGuess));

      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...alreadyGuessedWords,
          {
           guessedWord: unsuccesfulGuess, 
           letterMatchCount: 3 
          }]
      }

      const newState = store.getState();

      expect(newState).toEqual(expectedState);


    })

    test('updates state correctly for succesful guess', () => {

      store.dispatch(guessWord(secretWord));

      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...alreadyGuessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      }

      const newState = store.getState();
      expect(newState).toEqual(expectedState);
      
      

    })

  })

})