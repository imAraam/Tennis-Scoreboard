import React, { Component } from 'react';

import tennisIcon from './tennis.svg'; //Icon attribution --- Icon made by Freepik from https://www.flaticon.com/
import "./scoreBoard.style.css";


class ScoreBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            score1: 0,
            score2: 0
        }
    }

    //Create updateScore function to add game point to player winning game
        //If player wins 6 games (and games are won by difference of 2), add 1 to their set
            //If game score is 6-5, continue playing till there is game difference of 2
            //If game score is 6-6, play tiebreaker

    
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

    calculateScore = (player) => { /*----------condense this function----------*/
        if (player === 1) 
        {
            this.isDeuce(player);
            //Check if point scoring player has advantage
            if (this.state.score1 >= 4 && this.state.score1 === this.state.score2 + 1) {
                this.setState({
                    score1: 0,
                    score2: 0
                })   
            }           
            //Check if player scored game point
            else if ((this.state.score1 >= 3) && (this.state.score1 > this.state.score2 +2)){
                this.setState({
                    score1: 0,
                    score2: 0
                }) 
            }
            else {
                this.addPlayerPoint(player)
            }
        }
        //Do the same for player 2
        else {
            this.isDeuce(player);
            if (this.state.score2 >= 4 && this.state.score2 === this.state.score1 + 1){
                this.setState({
                    score1: 0,
                    score2: 0
                })   
            }
            else if ((this.state.score2 >= 3) && (this.state.score2 > this.state.score1 +2)){
                this.setState({
                    score1: 0,
                    score2: 0
                }) 
            }
            else {
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
                    translatedScore = "-";
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

    addPlayerPoint = (player) => {
        if (player === 1)
        {
            this.setState({
                score1: this.state.score1 + 1
            })  
        }
        else {
            this.setState({
                score2: this.state.score2 + 1
            })  
        }
    };


    render() {
    return (
        <div className="container">
            <div className="borderDiv">
                <div className="scoreBoard">

                    <h1>Score Board</h1>

                    <h5 className="py-4">
                        <img src= {tennisIcon} className="App-logo" alt="logo"></img>
                    </h5>

                    <h4>
                        <span className="px-5">{this.props.playerObj.player1}</span>
                        <span className="px-5">{this.props.playerObj.player2}</span>
                    </h4>

                    <h1>
                        <span className="px-4">Score: {this.displayScore(1)}</span>
                        <span className="px-4">Score: {this.displayScore(2)}</span>
                    </h1>

                    <div className="games">
                        <span className="px-4">Games: 0 || Sets: 0</span>
                        <span className="px-4">Games: 0 || Sets: 0</span>
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
}

export default ScoreBoard;


/*    addPoints = (score, player) => { //-----find neater way to write this

        if (player === 1)
        {
            if (score === 30){ //third point is scored as +10
                this.setState({
                    score1: this.state.score1 + 10
                })  
            }
            //If both players reach the same score of atleast 40, it is a deuce
            //Continue playing until a player scores 2 more points than the other
            else if (score >= 40 && this.state.score2 >= 40) 
            {
                this.setState({
                    score1: this.state.score1 + 15
                })
            }
            else if (score === 40 || (score > 40 && score > this.state.score2) || (score === 70)){ 
                //call updateScore
                this.setState({
                    score1: 0,
                    score2: 0
                })              
            } 
            else {
                this.setState({
                    score1: this.state.score1 + 15
                }) 
            }   
        }
        else {
            if (score === 30){
                this.setState({
                    score2: this.state.score2 + 10
                })  
            }
            else if ((score >= 40 && this.state.score1 >= 40) && (score === this.state.score1))
            {
                this.setState({
                    score2: this.state.score2 + 15
                })
            }
            else if (score === 40 || (score >= 40 && score > this.state.score1)){
                //call updateScore
                this.setState({
                    score1: 0,
                    score2: 0
                }) 
            } 
            else {
                this.setState({
                    score2: this.state.score2 + 15
                }) 
            }  
        }       
    }; */