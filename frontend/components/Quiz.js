import React from 'react'
import { connect } from 'react-redux';

import axios from 'axios';

export function Quiz(props) {
  console.log("quiz props", props)
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer === props.selectedAnswer ? 'selected' : ''}`}>
                A function
                <button>
                  {`${props.selectedAnswer === props.selectedAnswer ? 'SELECTED' : 'Select'}`}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer === props.selectedAnswer ? 'selected' : ''}`}>
                An elephant
                <button>
                {`${props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}`}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('quiz state', state)
  return({
    selectedAnswer: state.selectedAnswer
  });
}


export default connect(mapStateToProps)(Quiz);