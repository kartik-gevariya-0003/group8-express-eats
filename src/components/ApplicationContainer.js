import React, {Component} from 'react';
import Header from "./headers/Header";

export default class ApplicationContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header/>
        )
    }
}