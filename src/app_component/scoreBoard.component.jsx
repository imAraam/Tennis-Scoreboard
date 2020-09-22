import React, { Component } from 'react';

import ball from './ball.svg'; //Icon attribution --- Icon made by Freepik from https://www.flaticon.com/
import "./scoreBoard.style.css";


class ScoreBoard extends Component {
    constructor() {
        super();
        this.state = {
            score1: 0,
            score2: 0,
            game1: 0,
            game2: 0,
            set1: 0,
            set2: 0,

            boardTitle: "Score Board"
        }
    }

    render() {
        return (          
            <div className="container">
                <div className="borderDiv">
                    <div className="scoreBoard">

                        <h1>{this.state.boardTitle}</h1>

                        <h5 className="py-4">
                            <img src= {ball} className="App-logo" alt="logo"></img>
                        </h5>

                        <h4>
                            <span className="px-5">{this.props.playerObj.firstPlayer}</span>
                            <span className="px-5">{this.props.playerObj.secondPlayer}</span>
                        </h4>

                        <h1>
                            <span className="px-4">Score: {this.displayScore(1)}</span>
                            <span className="px-4">Score: {this.displayScore(2)}</span>
                        </h1>

                        <div className="games">
                            <span className="px-4">Games: {this.state.game1} || Sets: {this.state.set1}</span>
                            <span className="px-4">Games: {this.state.game2} || Sets: {this.state.set2}</span>
                        </div>

                        <div className="row">           
                            <div className="pt-4">
                                <button className="player1btn" onClick = {() => this.calculateScore(1)}>Score Point</button>
                            </div>
                            <div className="pt-4">
                                <button className="player2btn" onClick = {() => this.calculateScore(2)}>Score Point</button>
                            </div>
                        </div>               
                    </div>
                </div>
                
            </div>
    )   
}

handleWin = (player) => {
    let p1 = this.props.playerObj.firstPlayer
    let p2 = this.props.playerObj.secondPlayer
    if (player === 1)
    {
        this.resetBoard(p1)
    }
    else {
        this.resetBoard(p2)
    }
    
}

updateSetPoint = (player) => {
    if (player === 1)
    {
        if (this.state.set1 === 1){
            //player1 wins
            this.handleWin(player)
        }
        else {
            this.addSetPoint(player)  
        }            
    }
    else {
        if (this.state.set2 === 1){
            //player2 wins
            this.handleWin(player)
        }
        else {
            this.addSetPoint(player) 
        }     
    }
}

isDeuce = (player) => {
    if (player === 1)
    {
        //Continues tallying points for player if game is in deuce
        if (this.state.score1 >= 3 && this.state.score1 === this.state.score2)
        {
            this.addPlayerPoint(player)
        } 
    }
    else {
        if (this.state.score2 >= 3 && this.state.score2 === this.state.score1)
        {
            this.addPlayerPoint(player)
        } 
    }
};

translateScore(score) {
    let translatedScore;

    switch (score)
        {
            case 3:
                translatedScore = 40;
                break;
            case 2:
                translatedScore = 30;
                break;
            case 1:
                translatedScore = 15;
                break;
            case 0:
                translatedScore = "Love";
                break;
            default:
                translatedScore = "Adv."; 
                break;
        }

    return translatedScore;
}

displayScore(player) {

    var playerScore;
    if (player === 1)
    {
        playerScore = this.translateScore(this.state.score1)
    }
    else 
    {
        playerScore = this.translateScore(this.state.score2)
    }
    
    return playerScore;
}

updateGamePoint = (player) => {
    if (player === 1)
    {
        //If opponent game score is also 5, continue playing till there is a game difference of 2
        if (this.state.game1 === 5 && this.state.game2 === 5){
            this.addGamePoint(player)}
        
        else {
            this.addGamePoint(player) 
            //Reset game score and add 1 set point to winning player
            if (this.state.game1 >= 5){
                this.updateSetPoint(player)

                this.resetGames()}
        }           
    }
    else {
        if (this.state.game2 === 5 && this.state.game1 === 5){
            this.addGamePoint(player)}
        else {
            this.addGamePoint(player)

            if (this.state.game2 >= 5){
                this.updateSetPoint(player)

                this.resetGames()}
        } 
    }
};

calculateScore = (player) => { 
    if (player === 1) 
    {
        this.isDeuce(player);
        //Check if point scoring player has advantage
        if (this.state.score1 >= 4 && this.state.score1 === this.state.score2 + 1) {
            this.resetScore()  
            this.updateGamePoint(player)
        }           
        //Check if player scored game point
        else if ((this.state.score1 >= 3) && (this.state.score1 > this.state.score2 +2)){
            this.resetScore()
            this.updateGamePoint(player)
        }
        else {
            this.addPlayerPoint(player)
        }
    }
    //Do the same for player 2
    else {
        this.isDeuce(player);
        if (this.state.score2 >= 4 && this.state.score2 === this.state.score1 + 1){
            this.resetScore()
            this.updateGamePoint(player)
        }
        else if ((this.state.score2 >= 3) && (this.state.score2 > this.state.score1 +2)){
            this.resetScore()
            this.updateGamePoint(player)
        }
        else {
            this.addPlayerPoint(player)
        }
    }     
};

//--------------------Auxiliary functions---------------------

resetScore = () => {
    this.setState({
        score1: 0,
        score2: 0
    }) 
}

resetGames = () => {
    this.setState({
        game1: 0,
        game2: 0
    })
}

//resets state variables and displays message to winning player
resetBoard = (winningPlayer) => {
    this.setState({
        game1: 0,
        game2: 0,
        set1: 0,
        set2: 0,
        boardTitle: "Congratulations " + winningPlayer
    })
}

addSetPoint = (player) => {
    if (player === 1)
    {
        this.setState({
            set1: this.state.set1 + 1
        })
    }
    else {
        this.setState({
            set2: this.state.set2 + 1
        })
    }
}

addGamePoint = (player) => {
    if (player === 1)
    {
        this.setState({
            game1: this.state.game1 + 1
        })
    }
    else {
        this.setState({
            game2: this.state.game2 + 1
        })
    }
}

addPlayerPoint = (player) => {
    if (player === 1)
    {
        this.setState({
            score1: this.state.score1 + 1,
            boardTitle: "Score Board" //To update congrats message back to scoreboard upon full match completion
        })  
    }
    else {
        this.setState({
            score2: this.state.score2 + 1,
            boardTitle: "Score Board"
        })  
    }
}

}



export default ScoreBoard;