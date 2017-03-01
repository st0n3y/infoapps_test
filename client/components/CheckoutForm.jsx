import React, { Component } from 'react';
import SuccessMessage from './SuccessMessage.jsx'
import classNames from 'classnames';

export default class CheckoutForm extends Component {

  constructor() {
    super();
    this.state = {
      okToSubmit: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPostcode = this.getPostcode.bind(this);
  }

  getPostcode() {
    var postcode = document.getElementById("postcode").value;
    
    if(postcode !== "") {
      this.props.onPostcodeEntry(postcode);
    }
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
    if(this.state.okToSubmit === false)  inputClass += " alert";
    return (
      <div>
        <form className="form-main" onSubmit={this.handleSubmit}>
          <div className="form-section">
            <h1 id="header">Checkout Form</h1>
          </div>
          <div className="form-section">
            <input id="firstName" className={inputClass} type="text" name="firstName" placeholder="First Name" />*
            <input id="lastName" className={inputClass} type="text" name="lastName" placeholder="Last Name" />*
            <input id="email" className={inputClass} type="text" name="email" placeholder="E-mail" />*
            <input id="phone" className={inputClass} type="text" name="phone" placeholder="Phone" />*
          </div>
          <div className="form-section">
            <select id="country" className={inputClass} name="country">
              <option value="" disabled selected>Country</option>
              <option>Scotland</option>
              <option>England</option>
              <option>Wales</option>
              <option>Ireland</option>
            </select>*
            <input id="city" className={inputClass} type="text" name="city" placeholder="City" />*
            <input id="postcode" className={inputClass} type="text" name="postcode" placeholder="Postcode" onBlur={this.getPostcode} />*
            <input id="address" className={inputClass} type="text" name="address" placeholder="Address" />*
            <input id="longitude" className="form-input" type="text" name="longitude" placeholder="Longitude" />
            <input id="latitude" className="form-input" type="text" name="latitude" placeholder="Latitude" />
            <textarea className="form-input" rows="4" cols="50" name="additional info" placeholder="Additional info (200 characters max.)" maxLength="200"></textarea>
            <p>(* indicates required field)</p>
          </div>
          <button type="submit" id="submit">Submit</button>
          {
            this.state.okToSubmit ?
              <p></p>
              :
              <h3 className="alert">Please ensure all highlighted fields are filled in before submitting.</h3>
          }
        </form>
      </div>
    );
  }
}