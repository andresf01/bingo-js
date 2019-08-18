import React from 'react';
import Numero from './Numero';

const Board = (props) => {
  return (
    <div className="board">
      <p className={props.player.isWinner && 'winner'}>{props.player.name}</p>
      <table>
        <thead>
          <tr>
            <td><div>B</div></td>
            <td><div>I</div></td>
            <td><div>N</div></td>
            <td><div>G</div></td>
            <td><div>O</div></td>
          </tr>
        </thead>
        <tbody>
          {props.player.numbers.map((row, i) => {
            return (
              <tr
                key={i}
              >
                {row.map((col, j) => (
                  <td key={`${i}-${j}`}>
                    <Numero showed={props.numbers.includes(col)} current={props.numbers[props.numbers.length - 1] == col} number={col} />
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}


export default Board;