import React, { Component} from "react";
import MakeOrder from "./MakeOrder";
import ListOrder from "./ListOrder";
import LoginPage from "./LoginPage";
import NoPage from "./NoPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { getCookie } from "./App.js";

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:getCookie("username")
        }

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut()
    {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({username:""});
    }

    render(){
        let username = getCookie("username");
        /*
        if(username != "")
        {
            console.log(username);
        }
        */
        if(username != "")
        {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <h3>Home Page</h3>
                            <p>Hello {this.state.username}</p>
                            <form action="makeOrder" method="get">
                                <button type="submit">Make Order</button>
                            </form>
                            <form action="listOrder" method="get">
                                <button type="submit">List Orders</button>
                            </form>
                            <button onClick={this.handleSignOut}>Sign Out</button>                                               
                        </Route>
                        <Route path="/makeOrder" component={MakeOrder}></Route>
                        <Route path="/listOrder" component={ListOrder}></Route>
                        <Route path="/login" component={LoginPage}></Route>
                        <Route path="/signUp" component={SignUpPage}></Route>
                    </Switch>
                </BrowserRouter>
                );
        }
        else{
            return(
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route path="/signUp" component={SignUpPage}></Route>
                    <Route path="/*" component={LoginPage}></Route>
                </Switch>
            </BrowserRouter>
            );
        }
    }
}