import { getLetterMatchCount } from '../../helpers/index'
import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD'
};

export const guessWord = (guessedWord) => {
  return (dispatch, getState) => {
    const { secretWord } = getState();

    const matchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({ 
      type: actionTypes.GUESS_WORD, 
      payload: { 
        guessedWord: guessedWord, 
        letterMatchCount: matchCount
      }
    })

    if(matchCount === secretWord.length){
      dispatch({ type: actionTypes.CORRECT_GUESS })
    }

  }
}

export const getSecretWord = () => {
  return (dispatch) => {
    //for production server
    return axios.get('http://localhost:3030')
      .then((response) => {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: response.data
        });
      }).catch((err) => {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: 'train'
        })
      })

   
  }
}
