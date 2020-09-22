import React, {Component} from "react";
import "./form.style.css";


class Form extends Component {
    constructor() {
        super();
        this.state = {
            visibility: "visible",
            firstPlayerName: "",
            secondPlayerName: ""
        };
    }

    
    render() {
        //style object to hide the input form after player names are given
        const divVisibility = {
            visibility: this.state.visibility
        };

        return (
            <div className = "form-container">
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    <div className = "form" style = {divVisibility}>
                        
                        <div className ="col-md-3">
                            <input type="text" className = "form-control" placeholder = "Player1 Name" name="firstPlayerName" onChange = {this.handleInputChange.bind(this)} required/>
                        </div>
                        <div className ="secondPlayer col-md-3">
                            <input type="text" className = "form-control" placeholder = "Player2 Name" name="secondPlayerName" onChange = {this.handleInputChange.bind(this)} required/>
                        </div>
                        <div className = "submitbtn col-md-3">
                            <button className = "btn btn-warning"  onClick = {this.handleHide} >Submit Names</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    handleHide = () => {
        this.setState({
            visibility: "hidden"
        })
    }
    
    handleInputChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const firstPlayer = this.state.firstPlayerName
        const secondPlayer = this.state.secondPlayerName

        //send player names to parent where they can be displayed on scoreboard
        this.props.functionCallFromParent(firstPlayer, secondPlayer)
    }
}


export default Form;