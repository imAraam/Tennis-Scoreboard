import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ScoreBoard from "./app_component/scoreBoard.component.jsx";



//Create form component to appear before match begins and prompt for player names
  //Makes scoreboard visible once names are given and passed to scoreboard component
  //Once a player has 2 set points removes scoreboard visibility and shows a congratulations message to winner

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">   
        <ScoreBoard 
        playerObj = {{
          player1: "Sam",
          player2: "Dean" }}/>
      </div>
    );
  }
}


export default App;
