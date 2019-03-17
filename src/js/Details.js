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
                id={index}
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
                        <div className="account-details-left-section">
                            <div className="account-address">
                                Bitcoin Address: {this.props.address}
                            </div>
                            <div className="account-hash160">
                                Hash 160: {this.props.addressHash}
                            </div>
                        </div>
                        <div className="account-details-right-section">
                            <div className="total-received">
                                Total Received: {this.props.totalReceived}
                            </div>
                            <div className="total-spent">
                                Total Sent: {this.props.totalSent}
                            </div>
                            <div className="current-balance">
                                Current Balance: {this.props.balance}
                            </div>
                        </div>
                    </div>
                    <div className="transaction-list-heading">
                        <div className="heading-transaction-date">
                            <b>Date</b>
                        </div>
                        <div className="heading-transaction-time">
                            <b>Time</b>
                        </div>
                        <div className="heading-bitcoin-address">
                            <b>Address</b>
                        </div>
                        <div className="heading-transaction-amount-received">
                            <b>BitCoin Received</b>
                        </div>
                        <div className="heading-transaction-amount-sent">
                            <b>BitCoin Sent</b>
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