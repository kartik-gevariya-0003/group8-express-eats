/**
 * Author: Kartik Gevariya
 */

/**
 * This component is root component for all pages that will be displayed after login.
 */
import React, {Component} from 'react';
import Header from "./headers/Header";

export default class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      this.props.history.push({
        pathname: '/login'
      });
    }
  }
  render() {
    return (
      <Header {...this.props}/>
    )
  }
}