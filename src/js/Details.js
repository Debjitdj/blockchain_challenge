import React, { Component } from 'react';
import '../css/Details.css';
import Row from './Row.js';
import Transaction from './Transaction.js';

class Details extends Component {
    constructor(props) {
      super(props);
    }

    toggleTransactionVisibility = (index, isNew) => {
        this.props.toggleTransactionVisibility(index, isNew);
    }

    renderRow = (transaction, index, isNew) => {
        return (
            <div className="row-container" key={index}>
                <Row
                    transaction={transaction}
                    key={"row-class-"+String(isNew)+"-"+index}
                    id={index}
                    isNew={isNew}
                    toggleTransactionVisibility={this.toggleTransactionVisibility}
                />
                <Transaction
                    transaction={transaction}
                    key={"transaction-class-"+String(isNew)+"-"+index}
                    id={index}
                    isNew={isNew}
                    address={this.props.address}
                />
            </div>
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
          <div className="details-container">
            {
                this.props.isWrongAddress &&
                <div className="wrong-address">
                    Oops! This Bitcoin Address doesn't exist. Please verify Address.
                </div>
            }
            {
                this.props.isLoading && !this.props.isWrongAddress &&
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text"> Loading ... </div>
                </div>
                
            }
            {
                !this.props.emptySearch && !this.props.isWrongAddress &&
                <div className="details">
                    <div className="account-details">
                        <div className="account-details-left-section">
                            <div className="account-address">
                                <b>Bitcoin Address:</b> {this.props.address}
                            </div>
                            <div className="account-hash160">
                                <b>Hash 160:</b> {this.props.addressHash}
                            </div>
                            <div className="account-n_tx">
                                <b>No. Transactions:</b> {this.props.n_tx}
                            </div>
                        </div>
                        <div className="account-details-right-section">
                            <div className="total-received">
                                <b>Total Received:</b> {this.props.totalReceived}
                            </div>
                            <div className="total-spent">
                                <b>Total Sent:</b> {this.props.totalSent}
                            </div>
                            <div className="current-balance">
                                <b>Current Balance:</b> {this.props.balance}
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
                        <div className="heading-bitcoin-transaction-hash">
                            <b>Transaction Hash</b>
                        </div>
                        <div className="heading-transaction-amount-received">
                            <b>BitCoin</b> <br/> <b>Received</b>
                        </div>
                        <div className="heading-transaction-amount-sent">
                            <b>BitCoin</b> <br/> <b>Sent</b>
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