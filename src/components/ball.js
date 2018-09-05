import React from 'react';

const Ball = props => (
  <span className={props.current && 'ball__current'}>{props.number}</span>
)

export default Ball;