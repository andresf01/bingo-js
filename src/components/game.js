import React from 'react';
import Board from './board';
import { networkInterfaces } from 'os';

let names = ['James','Charlie'];

const generateBoardNumbers = () => {
  let elements = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  let max_min = [[1,15],[16,30],[31,45],[46,60],[61,75]];
  
  for (let x = 0; x < max_min.length; x++ ){
    for (let y = 0; y < 5; y ++){
      elements[x][y] = Math.floor(Math.random()*(max_min[y][1]-max_min[y][0]+1)+max_min[y][0]);
    }
  }
  return elements;
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.createNewPlayer = this.createNewPlayer.bind(this);
    // this.generateBoardNumbers = this.generateBoardNumbers.bind(this);
  }

  state = {
    players: [{
      name: 'Paco',
      numbers: [[1,16,31,46,61],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    },
    {
      name: 'Ramon',
      numbers: [[1,16,31,46,61],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    }
  ]
  }
  
  
  
  createNewPlayer(){
    let new_player = {
      name: names.pop(),
      numbers: generateBoardNumbers()
    }
    console.log(new_player);
    this.setState( (prevState)=>(
      {
        players: prevState.players.concat(new_player)
      }
    ));
    
  }

  render(){
    return (
      <div>
        <button onClick={this.createNewPlayer}>Add new player</button>
        {this.state.players.map((item, index) => (<Board player={item} key={index} />))} 
      </div>);
  }
}