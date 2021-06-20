import React, {Component} from 'react';
import LogoHeader from "./headers/LogoHeader";

export default class PlainHeaderComponent extends Component {
    constructor(props) {
        console.log('hello');
        super(props)
    }
    render() {
        return (
            <LogoHeader/>
        )
    }
}