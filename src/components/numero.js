import React from 'react';

const Numero = props => (
  <div className={props.showed && 'ball__current'}>{props.number}</div>
)

export default Numero;