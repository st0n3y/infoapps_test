// API key: AIzaSyDUjs1SZNoF_J70CSSvVvIVCW13qXk_06s
// Sample API request: https://maps.googleapis.com/maps/api/geocode/json?

import React, { Component } from 'react';
import SuccessMessage from './SuccessMessage.jsx'
import classNames from 'classnames';

export default class CheckoutForm extends Component {
  
  constructor() {
    super();
    this.state = {
      okToSubmit: true,
      data: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestAddressFromAPI = this.requestAddressFromAPI.bind(this);
    this.getPostcode = this.getPostcode.bind(this);
  }

  getPostcode() {
    var postcode = document.getElementById("postcode").value;

    if(postcode.length >= 8) {
      var postcodeArray = postcode.split(" ");
      var postcode1 = postcodeArray[0];
      var postcode2 = postcodeArray[1];
    }
    this.requestAddressFromAPI(postcode1, postcode2);
  }

  requestAddressFromAPI(postcode1, postcode2) {
    var url = this.props.url;
    var key = "&key=AIzaSyDUjs1SZNoF_J70CSSvVvIVCW13qXk_06s";
    var request = new XMLHttpRequest();
    
    url = url + postcode1 + "+" + postcode2 + key;
    console.log(url);
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      if(request.status === 200) {
        var data = JSON.parse(request.responseText);
        this.setState({ data: data });
      }
    }
    request.send(null);
    console.log(this.state.data);
  }

  handleSubmit(e) {
    e.preventDefault();
    let requiredInputs = document.getElementsByClassName("required");
    let requiredInputsArray = [];
    for(let i of requiredInputs) {
      requiredInputsArray.push(i.value);
    }
    if(requiredInputsArray.includes("")) {
      this.setState({
        okToSubmit: false
      })
    } else {
      this.props.onSubmit();
    }
  }

  render() {
    var inputClass = "form-input required";
    if(this.state.okToSubmit === false)  inputClass += " alert"
    return (
      <div>
        <form className="form-main" onSubmit={this.handleSubmit}>
          <div className="form-section">
            <h1 id="header">Checkout Form</h1>
          </div>
          <div className="form-section">
            <input id="firstName" className={inputClass} type="text" name="firstName" placeholder="First Name" />
            <input id="lastName" className={inputClass} type="text" name="lastName" placeholder="Last Name" />
            <input id="email" className={inputClass} type="text" name="email" placeholder="E-mail" />
            <input id="phone" className={inputClass} type="text" name="phone" placeholder="Phone" />
          </div>
          <div className="form-section">
            <select className={inputClass} name="country">
              <option value="" disabled selected>Country</option>
              <option>Scotland</option>
              <option>England</option>
              <option>Wales</option>
              <option>Ireland</option>
            </select>
            <input id="city" className={inputClass} type="text" name="city" placeholder="City" />
            <input id="postcode" className={inputClass} type="text" name="postcode" placeholder="Postcode" onChange={this.getPostcode} />
            <input id="longitude" className="form-input" type="text" name="longitude" placeholder="Longitude" />
            <input id="latitude" className="form-input" type="text" name="latitude" placeholder="Latitude" />
            <input id="address" className={inputClass} type="text" name="address" placeholder="Address" />
            <textarea className="form-input" rows="4" cols="50" name="additional info" placeholder="Additional info (250 characters max.)" maxLength="250"></textarea>
          </div>
          <button type="submit" id="submit">Submit</button>
          {
            this.state.okToSubmit ?
              <p></p>
              :
              <h3>Please fill in all of the highlighted fields before submitting.</h3>
          }
        </form>
      </div>
    );
  }
}