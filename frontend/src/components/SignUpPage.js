import React, { Component} from "react";
import { getCookie } from "./App.js";

export default class SignUpPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            response:"",
            message:""
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleUsernameChange(e){
        this.setState({username:e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }

    async handleSignUp() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
        };
        
        
        await fetch("/api/registerUser/", requestOptions)
          .then((response) => response.json())
          .then((data) => this.setState({response:JSON.parse(data)}));

        try {
            var isRegistered = this.state.response.registered;

            if(isRegistered)
            {
                document.cookie = "username="+this.state.username+"; path=/";
                location.assign("/");
            }
            else
            {
                this.setState({message:"Username taken."});
            }
        } catch (error) {
            console.log("Error at sign up.");
        }
    }

    render(){
        let username = getCookie("username");
        if(username != "")
        {
            location.assign("/");
        }
        return(
            <div>
                <h2>Sign Up</h2>
                <label>Username:
                    <input type="text" onChange={this.handleUsernameChange}/>
                </label>
                <br></br>
                <label>Password:
                    <input type="password" onChange={this.handlePasswordChange}/>
                </label>
                <br></br>
                <p style={{color:"red"}}>{this.state.message}</p>
                <br></br>
                <button onClick={this.handleSignUp}>Sign Up</button>
                <form action="login" method="get">
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}