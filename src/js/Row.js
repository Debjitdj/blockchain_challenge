import React, { Component } from 'react';
import '../css/Row.css';

class Row extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        var rowClass = (this.props.transaction.visible ? "row visible" : "row")
      return (
        <div className={rowClass} onClick={() => {this.props.toggleTransactionVisibility(this.props.id, this.props.isNew)}}>
            <div className="transaction-date">
                {this.props.transaction.date}
                {(this.props.isNew ? '(NEW)' : '')}
            </div>
            <div className="transaction-time">
                {this.props.transaction.time}
            </div>
            <div className="bitcoin-transaction-hash">
                {this.props.transaction.hash}
            </div>
            <div className="transaction-amount-received">
                <b>
                {
                    !this.props.transaction.spent &&
                    this.props.transaction.value
                }
                </b>
            </div>
            <div className="transaction-amount-sent">
                <b>
                {
                    this.props.transaction.spent &&
                    this.props.transaction.value
                }
                </b>
            </div>
        </div>
      );
    }
  }

export default Row;