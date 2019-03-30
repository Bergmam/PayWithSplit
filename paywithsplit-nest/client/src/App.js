import React, { Component } from 'react';
import './App.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import CheckoutForm from './CheckoutForm';


class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked : false
    };
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
        {!this.state.clicked ? <BuyButton onClick={this._onButtonClick}/> : null}
        {this.state.clicked ? <Checkout/> : null}
      </div>
    )
  }
}

class BuyButton extends Component {
  render() {
    return (
      <button {...this.props}>
        {
          "Pay with Split"
        }
      </button>
    )
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 5000
    }
  }
  onToken = (token, addresses) => {
    console.log("token: ", token)
    console.log('addresses: ', addresses)

    let body = {}
    body['stripeEmail'] = token.email;
    body['stripeToken'] = token.id;
    body['stripeTokenType'] = token.type;
    body['stripeBillingName'] = addresses.billing_name || "";
    body['stripeBillingAddressLine1'] = addresses.billing_address_line1 || "";
    
    console.log('body', body)
    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
      mode: "cors"
    })
    .then(res => {
      console.log('response received');
      console.log(res)
      return res.json();
    })
    .then(result => {
      console.log("result")
      console.log(result)
    })
    .catch(error => {
      console.log('error')
      console.error(error, "error in received!")
    })
  };


  render() {
    return (
      <StripeCheckout
        amount={this.state.amount}
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

// class FormComponent extends Component {
//   render() {
//     return (
//       <StripeProvider apiKey="pk_test_S6PzcbwueVbM4eIDKlQ5FK4200W95kYCLf">
//         <div className="example">
//           <h1>React Stripe Elements Example</h1>
//           <Elements>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </StripeProvider>
//     );
//   }
// }


export default App;
