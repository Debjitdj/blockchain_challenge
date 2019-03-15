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

    convertTime = (unixtimestamp) => {
      // Months array
      var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     
      // Convert timestamp to milliseconds
      var date = new Date(unixtimestamp*1000);
     
      // Year
      var year = date.getFullYear();
     
      // Month
      var month = months_arr[date.getMonth()];
     
      // Day
      var day = date.getDate();
     
      // Hours
      var hours = date.getHours();
     
      // Minutes
      var minutes = "0" + date.getMinutes();
     
      // Seconds
      var seconds = "0" + date.getSeconds();
     
      // Display date time in MM-dd-yyyy h:m:s format
      var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return convdataTime;
     }

    getTransactions = (address) => {

      var request = new XMLHttpRequest();

      request.open('GET', 'https://blockchain.info/rawaddr/'+address+'?cors=true', true);

      request.onload = () => {

        var data = JSON.parse(request.response);

        if (request.status >= 200 && request.status < 400) {
          this.props.updateBitcoinAccountBalance(data.final_balance);
          var transactionList = new Array();
          for(var i=0; i<data.txs.length; i++){
            var outputList = data.txs[i].out;
            for(var j=0; j<outputList.length; j++){
              var newTransaction = {};
              newTransaction['value'] = outputList[j].value;
              newTransaction['spent'] = ( outputList[j].spent ? 'Sent' : 'Received' );
              newTransaction['addr'] = outputList[j].addr;
              newTransaction['time'] = this.convertTime(data.txs[i].time);
              transactionList.push(newTransaction);
            }
          }
          this.props.updateTransactionList(transactionList);
          console.log(transactionList);
        }
        else {
          console.log('error');
        }
      }
      
      request.send();
    }

    render() {
      return (
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Enter the Bitcoin Address here" onChange={this.handleBitcoinAddressChange()}/>
            <button type="submit" className="searchButton" onClick={() => this.getTransactions(this.props.address)}>
                <img src={search_logo} alt="submit" />
            </button>
        </div>
      );
    }
  }

export default Search;