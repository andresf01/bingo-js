import React from 'react';
import Board from './board';

let names = ['Paco','Ramon','James','Charlie'];
let all_numbers = [];

const sleep = miliseconds => {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {
  }
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
    elements[x].push(letter_b.splice(Math.random()*letter_b.length, 1));
    elements[x].push(letter_i.splice(Math.random()*letter_i.length, 1));
    if (x != 2)
      elements[x].push(letter_n.splice(Math.random()*letter_n.length, 1));
    else
      elements[x].push('X');
    elements[x].push(letter_g.splice(Math.random()*letter_g.length, 1));
    elements[x].push(letter_o.splice(Math.random()*letter_o.length, 1));
  }

  return elements;
}

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.generateBall = this.generateBall.bind(this);
    this.stopGame = this.stopGame.bind(this);
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
      numbers: generateBoardNumbers()
    }
    document.getElementById('new_player__name').value = '';
    if (new_player.name == '')
      new_player.name = names.pop()

    this.setState( (prevState)=>(
      {
        players: prevState.players.concat(new_player)
      }
    ));
    
  }

  generateBall(){
    const number = all_numbers.splice(Math.random()*all_numbers.length, 1);
    this.setState((prevState)=>({numbers: prevState.numbers.concat(number[0])}));
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
      }, 3000)
    }
  }

  stopGame(){
    this.setState((prevState)=>({winner: true}));
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
        <p><button className="btnStart" onClick={this.startGame}>Start game</button><button onClick={this.stopGame} >Stop game</button></p>
        <p>
          <input placeholder="Name" id="new_player__name" ></input>
          <button onClick={this.createNewPlayer}>Add new player</button>
        </p>
        <p>
          {this.state.numbers.map((e,i)=>{
            if (i+1 != this.state.numbers.length)
              return <span key={i}>{e}</span>
            else
              return <span key={i} className="ball__current">{e}</span>
          })}
        </p>
        {this.state.players.map((item, index) => (<Board player={item} numbers={this.state.numbers} key={index} />))} 
      </div>);
  }
}