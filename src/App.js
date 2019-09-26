import React, { Component } from 'react';
import './App.css';

import Congrats from './components/Congrats';
import GuessedWords from './components/GuessedWord'
import Input from './components/Input';
import { connect } from 'react-redux';
import { getSecretWord } from './store/actions';

export class UnconnectedApp extends Component {

  componentDidMount(){
    this.props.getSecretWord();
  }

  render(){
    return (
      <div className="container" data-test="component-app">
        <h3 className="text-center">Jotto</h3>
        <Congrats success={this.props.success} />
        <Input success={this.props.success} />
        <GuessedWords guessedWords={this.props.guessedWords} />
  
      </div>
    );
  } 
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord }
}

export default connect(mapStateToProps, {getSecretWord})(UnconnectedApp);
