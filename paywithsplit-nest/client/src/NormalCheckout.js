import {withRouter} from 'react-router-dom'
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
const uuidv4 = require('uuid/v4')

class NormalCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        fullAmount: 10000,
        currency: "SGD",
        paymentAccepted : false
        }
    }

    onToken= (token, addresses) => {
      let userID = uuidv4();
      let paymentBody = {};
        paymentBody['id'] = uuidv4();
        paymentBody['amount'] = this.state.installment_amount;
        paymentBody['paymentToken'] = token.id;
        paymentBody['billingName'] = addresses.billing_name || "";
        paymentBody['billingAddress'] = addresses.billing_address_line1 || "";
        paymentBody['billingZip'] = addresses.billing_address_zip || "";
        paymentBody['billingCity'] = addresses.billing_address_city || "";
        paymentBody['userID'] = userID;
        paymentBody['time'] = new Date(Date.now());

      fetch("http://localhost:3001/outgoing-payments", {
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
        })
        .catch(error => {
          console.error(error, "error in outgoing payment response")
        })
    };

    render() {
        return (
          <div>
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid red', padding:'40px'
              }}>
                <b>Thanks for paying the boring, normal way!</b> <br/><br/>
                <b>Total One-Time Payment:</b> 1000 SGD <br/>
              </div>
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: ' translate(0, 100%)'
              }}>
                <StripeCheckout
                  amount={this.props.fullAmount}
                  billingAddress
                  name="One-Time Payment"
                  stripeKey="pk_test_S6PzcbwueVbM4eIDKlQ5FK4200W95kYCLf"
                  token={this.onToken}
                  zipCode
                />
              </div>
            </div> 
        )
      }
  }

  export default withRouter(NormalCheckout)