import React, { Component } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
const uuidv4 = require('uuid/v4')


class App extends Component {
  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
  } 

  _onButtonClick() {
    this.setState({
      clicked: true
    })
  }

  render() {
    return (
      <div>
        <Checkout/>
      </div>
    )
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_amount: 10000,
      installment_amount: 1000,
      currency: "SGD"
    }
  }
  onToken = (token, addresses) => {
    console.log("token: ", token)
    console.log('addresses: ', addresses)

    let paymentBody = {};
    paymentBody['stripeEmail'] = token.email;
    paymentBody['stripeToken'] = token.id;
    paymentBody['stripeTokenType'] = token.type;
    paymentBody['stripeBillingName'] = addresses.billing_name || "";
    paymentBody['stripeBillingAddressLine1'] = addresses.billing_address_line1 || "";
    
    console.log('paymentBody', paymentBody)
    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(paymentBody),
      mode: "cors"
    })
    .then(res => {
      console.log('payment response:');
      console.log(res)
      return res.json();
    })
    .then(result => {
      console.log("payment result:")
      console.log(result)

      let subscriberBody = {};
      
      let date = new Date(Date.now());

      subscriberBody['id'] = uuidv4();
      subscriberBody['name'] = addresses['billing_name'];
      subscriberBody['currency'] = this.state.currency;
      subscriberBody['amountLeft'] = this.state.full_amount - this.state.installment_amount;
      subscriberBody['nextPayment'] = date.setMonth(date.getMonth() + 1)
      subscriberBody['address'] = addresses.billing_address_line1 + " " + 
        addresses.billing_address_city + ", " + 
        addresses.billing_address_zip + ", " + 
        addresses.billing_address_country_code

      console.log('subscriberbody: ', subscriberBody);

      fetch("http://localhost:3001/subscribers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(subscriberBody),
        mode: "cors"
      })
      .then(res => {
        console.log('subscriber response:');
        console.log(res)
        return res.json();
      })
      .then(result => {
        console.log('subscriber result:');
        console.log(result)
      })
      .catch(error => {
        console.log('error')
        console.error(error, "error in received subscriber response!")
      })
    })
    .catch(error => {
      console.log('error')
      console.error(error, "error in received payment response!")
    })
  };


  render() {
    return (
      <StripeCheckout
        amount={this.state.installment_amount}
        billingAddress
        locale="auto"
        name="Pay With Split"
        stripeKey="pk_test_S6PzcbwueVbM4eIDKlQ5FK4200W95kYCLf"
        token={this.onToken}
        zipCode
      />
    )
  }
  
}

export default App;
