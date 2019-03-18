import React, { Component } from 'react';
import '../css/Row.css';

class Row extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="row">
            <div className="transaction-date">
                {this.props.transaction["date"]}
                {(this.props.isNew ? '(NEW)' : '')}
            </div>
            <div className="transaction-time">
                {this.props.transaction["time"]}
            </div>
            <div className="bitcoin-address">
                {this.props.transaction["addr"]}
            </div>
            <div className="transaction-amount-received">
                <b>
                {
                    !this.props.transaction["spent"] &&
                    this.props.transaction["value"]
                }
                </b>
            </div>
            <div className="transaction-amount-sent">
                <b>
                {
                    this.props.transaction["spent"] &&
                    this.props.transaction["value"]
                }
                </b>
            </div>
        </div>
      );
    }
  }

export default Row;