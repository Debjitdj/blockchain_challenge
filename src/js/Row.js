import React, { Component } from 'react';
import '../css/Row.css';

class Row extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        var rowClass = ((this.props.id%2===0) ? "row color1" : "row color2")
      return (
        <div className={rowClass}>
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
                {
                    !this.props.transaction["spent"] &&
                    this.props.transaction["value"]
                }
            </div>
            <div className="transaction-amount-sent">
                {
                    this.props.transaction["spent"] &&
                    this.props.transaction["value"]
                }
            </div>
        </div>
      );
    }
  }

export default Row;