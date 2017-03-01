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
    this.handlePostcode = this.handlePostcode.bind(this);
    this.requestAddressFromAPI = this.requestAddressFromAPI.bind(this);
    this.autofillFields = this.autofillFields.bind(this);
  }
  
  performSubmit() {
    this.setState({
      success: true
    })
  }

  handlePostcode(postcode) {
    var postcode1 = "";
    var postcode2 = "";

    if(postcode.includes(" ")) {
      let postcodeArray = postcode.split(" ");
      postcode1 = postcodeArray[0];
      postcode2 = postcodeArray[1];
    } else if(postcode.length === 7) {
      postcode1 = postcode.substr(0, 4);
      postcode2 = postcode.substr(4);
    } else if(postcode.length === 6) {
      postcode1 = postcode.substr(0, 3);
      postcode2 = postcode.substr(3);
    }
      
    this.requestAddressFromAPI(postcode1, postcode2)
      .then((parsedData) => {
        this.autofillFields(parsedData);
      })
  }

  requestAddressFromAPI(postcode1, postcode2) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    const key = "&key=AIzaSyDUjs1SZNoF_J70CSSvVvIVCW13qXk_06s";
    var request = new XMLHttpRequest();
    
    url = url + postcode1 + "+" + postcode2 + key;

    return new Promise((resolve, reject) => {
      request.open("GET", url);
      request.onload = () => {
        if(request.status !== 200) {
          reject("Error retrieving data")
        } else {
          var parsedData = JSON.parse(request.responseText);
          resolve(parsedData);
        }
      }
      request.send(null);
    });
  }

  autofillFields(parsedData) {
    var longitude = parsedData.results[0].geometry.location.lng;
    var latitude = parsedData.results[0].geometry.location.lat;

    var addressObject = parsedData.results[0].address_components;
    var addressValue = addressObject[1].long_name;
    var cityValue = addressObject[2].long_name;
    var countryValue = addressObject[4].long_name;

    document.getElementById("address").value = addressValue;
    document.getElementById("city").value = cityValue;
    document.getElementById("country").value = countryValue;
    document.getElementById("longitude").value = longitude;
    document.getElementById("latitude").value = latitude;
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
          <CheckoutForm 
            onSubmit={this.performSubmit} 
            onPostcodeEntry={this.handlePostcode} 
          />
        </div>
      );
    }
  }
}