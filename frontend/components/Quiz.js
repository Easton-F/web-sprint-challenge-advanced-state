import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { fetchQuiz, selectAnswer, setMessage, setQuiz, postAnswer } from '../state/action-creators';

export function Quiz(props) {

  useEffect(()=> {
    if (props.quiz === null){
      console.log('test', props.quiz)
      props.fetchQuiz();
    }
  }, []);


  const onSubmit = (e) => {
    props.postAnswer(props.selectedAnswer, props.quiz.quiz_id);
    e.preventDefault();
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz?.question}</h2>

            <div id="quizAnswers">
              {props.quiz.answers.map(value => <div className={`answer ${props.selectedAnswer === value.answer_id ? 'selected' : ''}`}>
                {value.text}
                <button onClick={()=> props.selectAnswer(value.answer_id)}>
                  {`${props.selectedAnswer === value.answer_id ? 'SELECTED' : 'Select'}`}
                </button>
              </div>)}
            </div>

            <button disabled={props.selectedAnswer === null} onClick={onSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return({
    selectedAnswer: state.selectedAnswer,
    quiz: state.quiz,
    message: state.infoMessage
  });
}


export default connect(mapStateToProps, { selectAnswer, fetchQuiz, setMessage, setQuiz, postAnswer })(Quiz);