import React from 'react';
import PropType from 'prop-types';

const GuessedWord = props => {

  let contents = props.guessedWords.length === 0 ? 
  (
    <span data-test="guess-instructions" >Have a guess at the word</span>
  ) :
  (
    <div data-test="guessed-words">
      <h4>Guessed Words</h4>
      <table className="table table-sm">
        <thead className="thead-light">
          <tr><th>Guess</th><th>Matching letters</th></tr>
        </thead>
        <tbody>
          {props.guessedWords.map(guess => {
            return (
            <tr key={guess.guessedWord} data-test="guessed-word">
              <td> {guess.guessedWord} </td>
              <td> {guess.letterMatchCount} </td>
            </tr>
            )
          })}
        </tbody>
      </table>
      
      
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