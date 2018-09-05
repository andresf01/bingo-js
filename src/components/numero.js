import React from 'react';

const Numero = props => (
  <div className={props.current ? 'ball__current' : props.showed && 'ball__marked'}>{props.number}</div>
)

export default Numero;