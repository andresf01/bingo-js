import React from 'react';
import Numero from './numero';

export default class Board extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <p>{this.props.player.name}</p>
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
              if (i==0){
                console.log(typeof this.props.numbers[0]);
                row.map((col,j)=>{
                  console.log(col);
                  // console.log(this.props.numbers.includes(col));
                });
              }
              return <tr key={i}>{row.map((col,j)=>(<td key={`${i}-${j}`}><Numero showed={this.props.numbers.includes(col[0])} number={col}/></td>))}</tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}