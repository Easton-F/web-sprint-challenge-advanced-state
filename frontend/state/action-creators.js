import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"

import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return ({type: MOVE_CLOCKWISE})
}

export function moveCounterClockwise() { 
  return({type: MOVE_COUNTERCLOCKWISE});
}

export function selectAnswer(answer) {
  return ({type: SET_SELECTED_ANSWER, payload: answer});
 }

export function setMessage(message) { 
  return ({type: SET_INFO_MESSAGE, payload: message});
}

export function setQuiz(quizData) { 
  return ({type: SET_QUIZ_INTO_STATE, payload: quizData});
}

export function inputChange(inputObj) { 
  return ({type: INPUT_CHANGE, payload: inputObj})
}

export function resetForm() { 
  return ({type: RESET_FORM, payload: null})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({
      type: SET_QUIZ_INTO_STATE,
      payload: null
    })
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        console.log('res data', res.data)
        console.log('res question:', res.data.question)
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: {
            ...res.data,
            answers: res.data.answers.sort(() => Math.random() - 0.5 )
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer_id, quiz_id) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', {answer_id, quiz_id})
      .then(res => {
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: null
        })
      dispatch({
        type: SET_INFO_MESSAGE,
        payload: res.data.message
      })
      fetchQuiz()(dispatch);
      })
      .catch(err =>{
        console.log(err)
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', {question_text, true_answer_text, false_answer_text})
      .then(res => {
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: `Congrats: "${res.data.question}" is a great question!`
        })
        dispatch({
          type: RESET_FORM,
          payload: null
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: res.data.message
        })
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
