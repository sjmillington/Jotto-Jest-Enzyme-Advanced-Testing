import React from 'react';
import PropType from 'prop-types';

const Congrats = props => {
  return (
     props.success ? (
       <div data-test="component-congrats">
          <span data-test="congrats-message">
            Congratulations! You guessed the word!
          </span>
       </div>
     ) : <div data-test="component-congrats" /> 
  )
}

Congrats.propTypes = {
  success: PropType.bool.isRequired
}

export default Congrats;
