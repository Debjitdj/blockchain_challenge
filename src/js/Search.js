import React, { Component } from 'react';
import '../css/Search.css';
import search_logo from '../media/search.svg'

class Search extends Component {
    constructor(props) {
      super(props);
    }

    handleBitcoinAddressChange = () => (event) => {
      const newValue = String(event.target.value);
      if (newValue !== null) {
          this.props.updateBitcoinAddress(newValue);
      }
    };

    getDetails(address) {
      this.getBalance(address);
      // getTransactions(address);
    }

    getBalance(address){
      fetch('https://blockchain.info/q/addressbalance/'+address)
      .then(balance => balance.json())
      .then(json => this.props.updateBitcoinAccountBalance(json))
    }

    render() {
      return (
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Enter the Bitcoin Address here" onChange={this.handleBitcoinAddressChange()}/>
            <button type="submit" className="searchButton" onClick={() => this.getDetails(this.props.address)}>
                <img src={search_logo} alt="submit" />
            </button>
            <div>{this.props.balance}</div>
        </div>
      );
    }
  }

export default Search;