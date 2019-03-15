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
    
    createTransactionLists = (address, counter) => {
      console.log(counter);
      var request = new XMLHttpRequest();

      request.open('GET', 'https://blockchain.info/rawaddr/'+address+'?cors=true', true);

      request.onload = () => {

        var data = JSON.parse(request.response);

        if (request.status >= 200 && request.status < 400) {
          if(this.props.allTransactionList[0]['time'] != this.convertTime(data.txs[0].time)){
            this.props.updateBitcoinAccountBalance(data.final_balance);
            var newTransactionList = new Array();
            var receivedTransactionList = new Array();
            for(var i=0; i<data.txs.length; i++){
              var outputList = data.txs[i].out;
              for(var j=0; j<outputList.length; j++){
                var transaction = {};
                transaction['value'] = outputList[j].value;
                transaction['spent'] = ( outputList[j].spent ? 'Sent' : 'Received' );
                transaction['addr'] = outputList[j].addr;
                transaction['time'] = this.convertTime(data.txs[i].time);
                receivedTransactionList.push(transaction);
              }
            }
            if(counter === 1){
              this.props.updateNewTransactionList([]);
              this.props.updateOldTransactionList(receivedTransactionList);
              this.props.updateAllTransactionList(receivedTransactionList);
            }
            else{
              for(var i=0; i<receivedTransactionList.length; i++){
                if(receivedTransactionList[i] != this.props.allTransactionList[0]){
                  newTransactionList.push(receivedTransactionList[0]);
                }
                else{
                  break;
                }
              }
              this.props.updateNewTransactionList(newTransactionList);
              this.props.updateOldTransactionList(this.props.allTransactionList);
              this.props.updateAllTransactionList(receivedTransactionList); 
            }       
          }
        }
        else {
          console.log('error');
        }
      }
      
      request.send();
    }

    getTransactions = (address) => {
      this.props.updateEmptySearch(false);
      var counter = 1;
      this.createTransactionLists(address,counter);
      setInterval(() => {
        counter++;
        this.createTransactionLists(address,counter);
      }, 10000);

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