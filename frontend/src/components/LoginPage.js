import React, { Component} from "react";
import { getCookie } from "./App.js";

export default class LoginPage extends Component {
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
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(e){
        this.setState({username:e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }

    async handleLogin() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
        };
        
        
        await fetch("/api/loginUser/", requestOptions)
          .then((response) => response.json())
          .then((data) => this.setState({response:JSON.parse(data)}));

        try {
            var isLogged = this.state.response.login;

            if(isLogged)
            {
                document.cookie = "username="+this.state.username+"; path=/";
                location.assign("/");
            }
            else
            {
                this.setState({message:"Wrong username or passord."});
            }
        } catch (error) {
            console.log("Error at login.");
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
                <h2>Login</h2>
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
                <button onClick={this.handleLogin}>Login</button>
                <form action="signUp" method="get">
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}