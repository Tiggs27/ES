import React, { Component} from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default class App extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <HomePage></HomePage>
        );
    }
}

const appDiv = document.getElementById("app");

render(<App text="Hello."></App>,appDiv);