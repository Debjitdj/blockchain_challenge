import React, { Component } from 'react';
import '../css/Body.css';
import Search from './Search.js';
import bg from '../media/bg1.png'

class Body extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        balance: 0,
      }
      this.updateBitcoinAddress= this.updateBitcoinAddress.bind(this);
      this.updateBitcoinAccountBalance=this.updateBitcoinAccountBalance.bind(this);
    }

    updateBitcoinAddress (newAddress) {
      this.setState({address: newAddress});
    };

    updateBitcoinAccountBalance(newBalance) {
      this.setState({balance: newBalance});
    }

    render() {
      return (
        <div className="Body">
          <img className="Background-image" src={bg}/>
          <Search
            updateBitcoinAddress={this.updateBitcoinAddress}
            updateBitcoinAccountBalance={this.updateBitcoinAccountBalance}
            address={this.state.address}
            balance={this.state.balance}
          />
        </div>
      );
    }
  }

export default Body;