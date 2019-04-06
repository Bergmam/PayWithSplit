import React, { Component } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import { BrowserRouter as Router, Link} from 'react-router-dom'
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
        <div>
          <Checkout/>
        </div>
        <div>
          <MoveToNormalPayment/>
        </div>
      </div>
      
    )
  }
}

class MoveToNormalPayment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Link to={'/normalPayment/'}>
          Click here to go to normal payment site.
        </Link>
      </Router>
      
    )
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullAmount: 10000,
      installmentAmount: 1000,
      currency: "SGD",
      paymentAccepted : false
    }
  }
  onToken = (token, addresses) => {
    let userID = uuidv4();
    let paymentBody = {};
    paymentBody['id'] = uuidv4();
    paymentBody['amount'] = this.state.installment_amount;
    paymentBody['paymentToken'] = token.id;
    paymentBody['billingName'] = addresses.billing_name || "";
    paymentBody['billingAddress'] = addresses.billing_address_line1 || "";
    paymentBody['userID'] = userID;
    paymentBody['time'] = new Date(Date.now());
    
    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(paymentBody),
      mode: "cors"
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log("All currently logged payments:")
      console.log(result)

      let subscriberBody = {};
      
      let date = new Date(Date.now());

      subscriberBody['id'] = userID;
      subscriberBody['name'] = addresses['billing_name'];
      subscriberBody['currency'] = this.state.currency;
      subscriberBody['amountLeft'] = this.state.fullAmount - this.state.installment_amount;
      subscriberBody['nextPayment'] = date.setMonth(date.getMonth() + 1)
      subscriberBody['address'] = addresses.billing_address_line1 + " " + 
        addresses.billing_address_city + ", " + 
        addresses.billing_address_zip + ", " + 
        addresses.billing_address_country_code

      fetch("http://localhost:3001/subscribers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(subscriberBody),
        mode: "cors"
      })
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log('All currently subscribed users:');
        console.log(result)
        this.setState({
          paymentAccepted : true
        })
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
    if (!this.state.paymentAccepted) {
      return (
        <CheckoutComponent onToken={this.onToken} installmentAmount={this.state.installmentAmount}/>
      )
    } else {
      return (
        <PaymentDoneComponent/>
      )
    }
  }
}

class CheckoutComponent extends Component {

  render() {
    return (
      <div>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid red', padding:'40px'
          }}>
            <b>Thank you for choosing to pay with Split!</b> <br/><br/>
            <b>Total Payment:</b> 1000 SGD <br/>
            <b>First Installment:</b> 100 SGD <br/>
            <b>Payment Period:</b> 10 months <br/>
          </div>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: ' translate(0, 100%)'
          }}>
            <StripeCheckout
              amount={this.props.installmentAmount}
              billingAddress
              name="Pay With Split"
              stripeKey="pk_test_S6PzcbwueVbM4eIDKlQ5FK4200W95kYCLf"
              token={this.props.onToken}
              zipCode
            />
          </div>
        </div> 
    )
  }
}

class PaymentDoneComponent extends Component {

  render() {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid red', padding:'40px'
      }}>
        <b>Thank you for paying with split!</b> <br/>
      </div>
    )
  }
}

export default App;
