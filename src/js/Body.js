import React, { Component } from 'react';
import '../css/Body.css';
import Search from './Search.js';
import Details from './Details.js';
import bg from '../media/bg1.png'

class Body extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        balance: 0,
        transactionList: []
      }
      this.updateBitcoinAddress= this.updateBitcoinAddress.bind(this);
      this.updateBitcoinAccountBalance=this.updateBitcoinAccountBalance.bind(this);
      this.updateTransactionList=this.updateTransactionList.bind(this);
    }

    updateBitcoinAddress (newAddress) {
      this.setState({address: newAddress});
    };

    updateBitcoinAccountBalance(newBalance) {
      this.setState({balance: newBalance});
    }

    updateTransactionList(newList) {
      this.setState({transactionList: newList});
    }

    render() {
      return (
        <div className="Body">
          <img className="Background-image" src={bg}/>
          <Search
            updateBitcoinAddress={this.updateBitcoinAddress}
            updateBitcoinAccountBalance={this.updateBitcoinAccountBalance}
            updateTransactionList={this.updateTransactionList}
            address={this.state.address}
            balance={this.state.balance}
          />
          <Details
            address={this.state.address}
            balance={this.state.balance}
            transactionList={this.state.transactionList}
          />
        </div>
      );
    }
  }

export default Body;