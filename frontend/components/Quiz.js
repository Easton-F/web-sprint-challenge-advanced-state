import React from 'react'
import { connect } from 'react-redux';

import { selectAnswer, fetchQuiz } from '../state/action-creators';

import axios from 'axios';

export function Quiz(props) {
  console.log("quiz props", props)
  console.log('selected answer', props.selectedAnswer)
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer === 0 ? 'selected' : ''}`}>
                A function
                <button onClick={()=> selectAnswer(0)}>
                  {`${props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}`}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer === 1 ? 'selected' : ''}`}>
                An elephant
                <button onClick={()=> selectAnswer(1)}>
                {`${props.selectedAnswer === 1 ? 'SELECTED' : 'Select'}`}
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
    selectedAnswer: state.selectedAnswer,
  
  });
}


export default connect(mapStateToProps, { selectAnswer })(Quiz);