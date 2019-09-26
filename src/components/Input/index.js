import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guessWord } from '../../store/actions';

export class UnconnectedInput extends Component{

  state = {
    currentGuess: ''
  }

  submitGuessedWord = (evt) => {
    evt.preventDefault();

    const guessedWord = this.state.currentGuess;

    if(guessedWord && guessedWord.length > 0){
      this.props.guessWord(guessedWord);

      this.setState({
        ...this.state,
        currentGuess: ''
      })
    }



  }

  render(){
    const content = this.props.success ? null : (
      <form className="form-inline">
        <input 
          data-test='input-box'
          className="mb-2 mx-sm-3"
          value={this.state.currentGuess}
          onChange={(event) => this.setState({
            ...this.state,
            currentGuess: event.target.value
          })}
          type="text"
          placeholder="enter guess"
        />
        <button 
          data-test='submit-button' 
          type="submit"
          onClick={(evt) => this.submitGuessedWord(evt)}
          className="mb-2 btn btn-primary">
            Submit
        </button>
      </form>
    )

    return (
      <div data-test='component-input'>
        {content}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    success: state.success
  }
}


export default connect(mapStateToProps, { guessWord })(UnconnectedInput);