import React from 'react';
import Board from './board';
import Ball from './ball';

let names = ['Paco','Ramon','James','Charlie'];
let all_numbers = [];

const sleep = miliseconds => {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

/**
 * Check if all elements in arr1 are in arr2
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
const checkArrayIntoArray = (arr1, arr2) =>{
  for (let row of arr1){
    for (let item of row){
      if (!arr2.includes(item) && item != 'X'){
        return false;
      }
    }
  }
  return true;
}

const generateBoardNumbers = () => {
  let elements = [];
  let letter_b = [];
  let letter_i = [];
  let letter_n = [];
  let letter_g = [];
  let letter_o = [];

  for (let x = 0; x < 15; x++){
    letter_b.push(x+1);
    letter_i.push(x+16);
    letter_n.push(x+31);
    letter_g.push(x+46);
    letter_o.push(x+61);
  }

  for (let x = 0; x < 5; x++ ){
    elements.push([]);
    elements[x].push(letter_b.splice(Math.random()*letter_b.length, 1)[0]);
    elements[x].push(letter_i.splice(Math.random()*letter_i.length, 1)[0]);
    if (x != 2)
      elements[x].push(letter_n.splice(Math.random()*letter_n.length, 1)[0]);
    else
      elements[x].push('X');
    elements[x].push(letter_g.splice(Math.random()*letter_g.length, 1)[0]);
    elements[x].push(letter_o.splice(Math.random()*letter_o.length, 1)[0]);
  }

  return elements;
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.generateBall = this.generateBall.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.calculateWinner = this.calculateWinner.bind(this);
    // this.generateBoardNumbers = this.generateBoardNumbers.bind(this);
  }

  state = {
    players: [],
    numbers: [],
    winner: false,
    errors: ''
  }
  
  createNewPlayer(){
    let new_player = {
      name: document.getElementById('new_player__name').value,
      numbers: generateBoardNumbers(),
      isWinner: false
    }
    document.getElementById('new_player__name').value = '';
    if (new_player.name == '')
      new_player.name = 'Unknown';

    this.setState( (prevState)=>(
      {
        players: prevState.players.concat(new_player)
      }
    ));
    
  }

  calculateWinner(){
    const players = this.state.players;
    const numbers = this.state.numbers;

    for (let player of players){
      if (checkArrayIntoArray(player.numbers, numbers)){
        // player.isWinner = true;
        this.setState((prevState)=>({ 
          winner: true,
          players: prevState.players.map((e)=>{
            if (e == player){
              player.isWinner = true;
              return player;
            }
            else{
              return e;
            }
          })
        }));
      }
    }
  }

  generateBall(){
    const number = all_numbers.splice(Math.random()*all_numbers.length, 1);
    this.setState((prevState)=>({numbers: prevState.numbers.concat(number[0])}));
    this.calculateWinner();
    this.startGame();
  }

  startGame(){
    const players = this.state.players.length;
    if (players == 0){
      this.setState(()=>({ errors: 'No players available'}));
      return;
    }

    let winner = this.state.winner;
    if (!winner && all_numbers.length != 0){
      setTimeout(()=>{
        this.generateBall();
      }, 1000)
    }
  }

  pauseGame(){
    this.setState((prevState)=>({winner: !prevState.winner}));
  }

  componentDidMount(){
    for (let x= 1; x<76; x++)
      all_numbers.push(x);
  }

  render(){
    return (
      <div>
        <h1>Bingo JS</h1>
        {this.state.errors && <p>{this.state.errors}</p>}
        <p><button className="btnStart" onClick={this.startGame}>Start game</button>{ this.state.numbers.length > 0 && <button onClick={this.pauseGame} className="btnStart" >Pause game</button>}</p>
        <p>
          <input placeholder="Name" id="new_player__name" ></input>
          <button onClick={this.createNewPlayer}>Add new player</button>
        </p>
        <div>
          {this.state.numbers.length > 0 && <p>Total balotas: {this.state.numbers.length}</p>}
          <p className="boards">
            {this.state.numbers.map((e,i)=>{
              if (i+1 != this.state.numbers.length)
                return <Ball key={i} number={e} />
              else
                return <Ball key={i} number={e} current={true} />
            })}
          </p>
        </div>
        <div className="boards">
          {this.state.players.map((item, index) => (<Board player={item} numbers={this.state.numbers} key={index} />))} 
        </div>
      </div>);
  }
}