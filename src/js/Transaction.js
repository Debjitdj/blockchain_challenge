import React, { Component } from 'react';
import '../css/Transaction.css';

class Transaction extends Component {
    constructor(props) {
      super(props);
    }

    getSenders = () => {
        var senders = this.props.transaction.inputs.map((address) => <div className="address">{address}</div>)
        return(
            <div className="senders">
                <div className="address-list-heading"><b><u>Sender(s)</u></b></div>
                {senders}
            </div>
        )
    }

    getReceivers = () => {
        var receivers = this.props.transaction.out.map((address) => <div className="address">{address}</div>)
        return(
            <div className="receivers">
                <div className="address-list-heading"><b><u>Receiver(s)</u></b></div>
                {receivers}
            </div>
        )
    }

    render() {
      return (
        <div className="transaction-details-container">
        {
          this.props.transaction.visible &&
            <div className="transaction-details">
                {this.getSenders()}
                <div className="arrow">
                    ====>
                </div>
                {this.getReceivers()}
            </div>
        }
        </div>
      );
    }
  }

export default Transaction;