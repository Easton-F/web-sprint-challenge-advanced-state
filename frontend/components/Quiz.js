import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { fetchQuiz, selectAnswer } from '../state/action-creators';

export function Quiz(props) {
  console.log("quiz props", props)

  useEffect(()=> {
    console.log('fetching quiz')
    if (props.quiz === null){
      console.log('test', props.quiz)
      props.fetchQuiz();
    }
  }, []);

  console.log('quiz data', props.quiz)

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            {/* <h2>{props.quiz.question}</h2> */}

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
    quiz: state.quiz
  });
}


export default connect(mapStateToProps, { selectAnswer, fetchQuiz })(Quiz);