import React, { Component } from 'react';
import '../css/Details.css';
import Row from './Row.js';

class Details extends Component {
    constructor(props) {
      super(props);
    }

    renderRow = (transaction, index) => {
        return (
            <Row
                transaction={transaction}
                key={index}
            />
        )
    }

    getTransactionRows = () => {
        var elements = this.props.transactionList.map((transaction,index) => this.renderRow(transaction,index));

        return (
            <div className="transaction-container">
                {elements}
            </div>
        )
    }

    render() {
      return (
        <div className="details">
            <div className="account-details">
                {this.props.balance}
            </div>
            <div className="transaction-list-heading">
                <div className="sent-received">
                    Sent/Received
                </div>
                <div className="bitcoin-address">
                    Address
                </div>
                <div className="transaction-timestamp">
                    TimeStamp
                </div>
                <div className="transaction-amount">
                    BitCoin Amount
                </div>
            </div>
            {this.getTransactionRows()}
        </div>
      );
    }
  }

export default Details;