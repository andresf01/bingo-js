import React from 'react';
import Numero from './numero';

export default class Board extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="board">
        <p className={this.props.player.isWinner && 'ball__current'}>{this.props.player.name}</p>
        <table>
          <thead>
            <tr>
              <td>B</td>
              <td>I</td>
              <td>N</td>
              <td>G</td>
              <td>O</td>
            </tr>
          </thead>
          <tbody>
            {this.props.player.numbers.map((row,i)=>{
              return <tr key={i}>{row.map((col,j)=>(<td key={`${i}-${j}`}><Numero showed={this.props.numbers.includes(col)} number={col}/></td>))}</tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}