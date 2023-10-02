import React, { Component} from "react";
import { getCookie } from "./App.js";

export default class MakeOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:getCookie("username"),
            order:"",
            response:"",
            message:"",
            audio_id:""
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(e)
    {
        this.setState({order:e.target.value});
    }

    async handleSubmit(e)
    {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: this.state.username,
              order : this.state.order
            }),
          };
          
          
          await fetch("/api/newOrder/", requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({response:JSON.parse(data)}));
  
          try {
              this.setState({message:this.state.response.message});
              this.setState({audio_id:this.state.response.audio});
          } catch (error) {
              console.log("Error at making new order.");
          }

    }

    render(){
        let username = getCookie("username");
        if(username == "")
        {
            location.assign("/");
        }

        const aux_audio = [] 
        if (this.state.audio_id != ""){
            var audio_url = "https://elasticbeanstalk-us-east-1-310984941593.s3.amazonaws.com/"+this.state.audio_id
            aux_audio.push(<audio controls><source src={audio_url} type="audio/mp3"></source>Your browser does not support the audio element.</audio>);
        }

        return(
            <div>
                <h3>Make new order</h3>
                <p>Type your order below</p>
                <textarea onChange={this.handleTextChange}></textarea>
                <p>{this.state.message}</p>
                {aux_audio}
                <br></br>
                <button onClick={this.handleSubmit}>Submit</button>
                <form action="/" method="get">
                    <button type="submit">Back</button>
                </form>
            </div>
        );
    }
}