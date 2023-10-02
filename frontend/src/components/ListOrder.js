import React, { Component} from "react";
import { getCookie } from "./App.js";

export default class ListOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:getCookie("username"),
            orderList: [],
            itemList: [],
            response:"",
            message:""
        };

        this.handleGetListOrder = this.handleGetListOrder.bind(this);
        this.handleConfirmDelivery = this.handleConfirmDelivery.bind(this);
    }

    async handleGetListOrder() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.state.username
          }),
        };
        
        
        await fetch("/api/orders/", requestOptions)
          .then((response) => response.json())
          .then((data) => this.setState({response:JSON.parse(data)}));

        try {
            this.setState({orderList:this.state.response.orders});
            this.setState({itemList:this.state.response.items});
            if(this.state.orderList.length == 0)
            {
                this.setState({message:"You have no orders yet."});
            }
        } catch (error) {
            console.log("Error at updating order list.");
        }
    }

    async handleConfirmDelivery(e) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: parseInt(e.target.id)
          }),
        };
        
        
        await fetch("/api/confirmDelivery/", requestOptions)
          .then((response) => response.json())
          .then((data) => this.setState({response:JSON.parse(data)}));

        this.handleGetListOrder();
    }

    render(){
        let username = getCookie("username");
        if(username == "")
        {
            location.assign("/");
        }

        const final = [];

        let i = 0;
        for(let order in this.state.orderList)
        {
            let tmp_items = [];
            tmp_items.push(<tr><th>Item name</th><th>Is available?</th></tr>);
            for(let item in this.state.itemList[i])
            {
                tmp_items.push(<tr><td>{this.state.itemList[i][item][0]}</td><td>{this.state.itemList[i][item][1] === 1 ? "Yes" : "No"}</td></tr>)
            }
            i += 1;
            var audio_url = "https://elasticbeanstalk-us-east-1-310984941593.s3.amazonaws.com/"+this.state.orderList[order][0]+".mp3";
            final.push(<><h3>Order {this.state.orderList[order][0]}, {this.state.orderList[order][1]}, delivery at {this.state.orderList[order][2]}</h3><button id={this.state.orderList[order][0].toString()} onClick={this.handleConfirmDelivery}>Confirm Delivery</button><br></br><audio controls><source src={audio_url} type="audio/mp3"></source>Your browser does not support the audio element.</audio><table>{tmp_items}</table></>);
        }

        return(
            <div>
                <h3>Your order history</h3>
                <p>{this.state.message}</p>                
                {final}
                <button onClick={this.handleGetListOrder}>Refresh</button>
                <form action="/" method="get">
                    <button type="submit">Back</button>
                </form>
            </div>
        );
    }
}