import React from 'react';
import PropType from 'prop-types';

const GuessedWord = props => {

  let contents = props.guessedWords.length === 0 ? 
  (
    <span data-test="guess-instructions" >Guess a word</span>
  ) :
  (
    <div data-test="guessed-words">
      <h3>Guessed Words</h3>
      <table>
        <thead>
          <tr><th>Guess</th><th>Matching letters</th></tr>
        </thead>
      </table>
      <tbody>
      {props.guessedWords.map(guess => {
        return (
        <tr key={guess.guessedWord} data-test="guessed-word">
          <td> {guess.guessedWord} </td>
          <td> {guess.letterMatchCount}  </td>
        </tr>
        )
       })}

      </tbody>
      
    </div>
  );

  return (
    <div data-test="component-guessed-words" >
       {contents}
    </div>
  )

}

GuessedWord.propTypes = {
  guessedWords: PropType.arrayOf(PropType.shape({
    guessedWord: PropType.string.isRequired,
    letterMatchCount: PropType.number.isRequired
  })).isRequired
}

export default GuessedWord