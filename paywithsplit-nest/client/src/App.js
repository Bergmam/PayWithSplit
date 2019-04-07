import React, { Component } from 'react';
import './App.css';
import SplitCheckout from './Splitcheckout';
import NormalCheckout  from './NormalCheckout'
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'


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
        <Router>
          <div>          
              <Route exact path='/' component={SplitCheckout}/>
              <Route path='/NormalCheckout' component={NormalCheckout}/> 
          </div>
          <div>
            <MoveToNormalPayment/>
          </div>
        </Router>
      </div>
    )
  }
}

class MoveToNormalPayment extends Component {

  render() { 
    return (
        <Link to={'/NormalCheckout'}>
          Click here to go to normal payment site.
        </Link>      
    )
  }
}



export default App;
