import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ScoreBoard from "./app_component/scoreBoard.component.jsx";
import Form from "./app_component/form.component.jsx";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstPlayerName: "",
      secondPlayerName: ""
    };
  }


  render() {
    return (
      <div className="App">  
        <Form functionCallFromParent = {this.getPlayerNames.bind(this)}/>

        {/* //Display scoreboard if user provides player name */}
        {this.state.firstPlayerName !== "" ? <ScoreBoard 
        playerObj = {{
          firstPlayer: this.state.firstPlayerName,
          secondPlayer: this.state.secondPlayerName }}/> : null}
      </div>
    );
  }


  getPlayerNames = (firstPlayer, secondPlayer) => {

    this.setState ({
      firstPlayerName: firstPlayer,
      secondPlayerName: secondPlayer
    })

  }
}


export default App;
