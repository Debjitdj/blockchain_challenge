import React, { Component } from 'react';
import '../css/Transaction.css';
import arrow from '../media/arrow1.svg'

class Transaction extends Component {

    renderAddress = (address, status) => {
        var addressClass = (address === this.props.address ? "address" : "address blue");
        return (
            <div className={addressClass} key={status+"-"+address}>{address}</div>
        )
    }

    getSenders = () => {
        var senders = this.props.transaction.inputs.map((address) => this.renderAddress(address,"sender"));
        return(
            <div className="senders">
                <div className="address-list-heading"><b><u>Sender(s)</u></b></div>
                {senders}
            </div>
        )
    }

    getReceivers = () => {
        var receivers = this.props.transaction.out.map((address) => this.renderAddress(address, "receiver"))
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
                    <img src={arrow}/>
                </div>
                {this.getReceivers()}
            </div>
        }
        </div>
      );
    }
  }

export default Transaction;