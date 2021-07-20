/**
 * Author: Kartik Gevariya
 */
import React, {Component} from 'react';
import LogoHeader from "./headers/LogoHeader";

export default class PlainHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <LogoHeader {...this.props}/>
    )
  }
}