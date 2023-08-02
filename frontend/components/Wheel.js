import React from 'react'
import { connect } from 'react-redux';

import { moveClockwise } from '../state/action-creators';

export default function Wheel(props) {
  console.log(props)
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${props.state === 0 ? 'active' : ''}`} style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("the state", state);
  return({
    null: null
  });
}

 connect(mapStateToProps, { moveClockwise })(Wheel);