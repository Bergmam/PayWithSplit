import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        {this.state.clicked ? <PurchaseForm/> : null}
      </div>
    )
  }
}

class BuyButton extends Component {
  render() {
    return (
      <button {...this.props}>
        {
          "Buy with Split"
        }
      </button>
    )
  }
}

class PurchaseForm extends Component {
  render() {
    return (
      <div {...this.props}> Purchase Form Component</div>
    )
  }
}

export default App;
