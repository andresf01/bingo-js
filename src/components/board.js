import React from 'react';

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
              return <tr key={i}>{row.map((col,j)=>(<td key={`${i}-${j}`}>{col}</td>))}</tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}