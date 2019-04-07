import {withRouter} from 'react-router-dom'
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class NormalCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        fullAmount: 10000,
        currency: "SGD",
        paymentAccepted : false
        }
    }

    onToken= () => {

    }

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