import React, { Component } from 'react';
import '../css/Details.css';
import Row from './Row.js';

class Details extends Component {
    constructor(props) {
      super(props);
    }

    renderRow = (transaction, index, isNew) => {
        return (
            <Row
                transaction={transaction}
                key={index}
                isNew={isNew}
            />
        )
    }

    getTransactionRows = () => {
        var newElements = this.props.newTransactionList.map((transaction,index) => this.renderRow(transaction,index,true));
        var oldElements = this.props.oldTransactionList.map((transaction,index) => this.renderRow(transaction,index,false));

        return (
            <div className="transaction-container">
                {newElements}
                {oldElements}
            </div>
        )
    }

    render() {
      return (
          <div>
            {
                !this.props.emptySearch &&
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
            }
          </div>
      );
    }
  }

export default Details;