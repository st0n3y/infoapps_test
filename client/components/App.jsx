import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm.jsx';
import SuccessMessage from './SuccessMessage.jsx';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      success: false,
    };
    this.performSubmit = this.performSubmit.bind(this);
  }
  
  performSubmit() {
    this.setState({
      success: true
    })
  }

  render() {
    
    if(this.state.success) {
      return(
        <div className="outer-container">
          <SuccessMessage />
        </div>
      );
    } else {
      return(
        <div className="outer-container">
          <CheckoutForm onSubmit={this.performSubmit} url="https://maps.googleapis.com/maps/api/geocode/json?address="/>
        </div>
      );
    }
  }
}