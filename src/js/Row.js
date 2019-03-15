import React, { Component } from 'react';
import '../css/Row.css';

class Row extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
            <div className="sent-received">
                {this.props.transaction["spent"]}
            </div>
            <div className="bitcoin-address">
                {this.props.transaction["addr"]}
            </div>
            <div className="transaction-timestamp">
                {this.props.transaction["time"]}
            </div>
            <div className="transaction-amount">
                {this.props.transaction["value"]}
            </div>
        </div>
      );
    }
  }

export default Row;