import React, { Component } from 'react';
import '../css/Search.css';
import search_logo from '../media/search.svg'
import { resolve } from 'path';

class Search extends Component {
    constructor(props) {
      super(props);
    }

    handleBitcoinAddressChange = () => (event) => {
      const newValue = String(event.target.value);
      if (newValue !== null) {
          this.props.updateEnteredBitcoinAddress(newValue);
      }
    };

    convertTime = (unixtimestamp) => {
      var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var date = new Date(unixtimestamp*1000);
      var year = date.getFullYear();
      var month = months_arr[date.getMonth()];
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var convData = month+'-'+day+'-'+year;
      var convTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return {
        "date": convData,
        "time": convTime
      };
     }
    
    createTransactionLists = (enteredAddress, counter) => {
        console.log(counter);
        var request = new XMLHttpRequest();

        var currentTime = Math.round(+new Date()/1000);
        var lastAPICall = this.props.lastAPICall;
        var waitingTime = 0;

        if (currentTime - lastAPICall < 10){
          waitingTime = 10 - currentTime + lastAPICall;
        }
        setTimeout(() => {
          this.props.updateLastAPICall(Math.round(+new Date()/1000));
          request.open('GET', 'https://blockchain.info/rawaddr/'+enteredAddress+'?cors=true', true);
        
          request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
              setTimeout(() => {
                this.props.updateIsLoading(false);
                this.props.updateEmptySearch(false);
              },3000)
              if(!this.props.isWrongAddress && this.props.newSearchAddress === enteredAddress){
                setTimeout(() => {
                  counter++;
                  if (this.props.newSearchAddress === enteredAddress){
                    this.createTransactionLists(enteredAddress,counter);
                  }
                }, 10000);
              }
            }
          }
    
          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              var data = JSON.parse(request.response);
              if(this.props.address !== data.address || (this.props.address === data.address && this.props.allTransactionList[0].hash !== data.txs[0].hash)){
                this.props.updateEmptySearch(true);
                this.props.updateIsLoading(true);
                this.props.updateBitcoinAddress(data.address);
                this.props.updateBitcoinAddressHash(data.hash160);
                this.props.updateTotalReceived(data.total_received);
                this.props.updateTotalSent(data.total_sent);
                this.props.updateBitcoinAccountBalance(data.final_balance);
                var newTransactionList = [];
                var receivedTransactionList = [];
                for (var i=0; i<data.txs.length; i++){
    
                  var dataInputs = data.txs[i].inputs;
                  var inputList  = [];
                  var f = 0;
                  var sentValue = 0;
                  for (var j=0; j<dataInputs.length; j++){
                    if(dataInputs[j].prev_out.addr === data.address){
                      sentValue += dataInputs[j].prev_out.value;
                      f=1;
                    }
                    else{
                      inputList.push(dataInputs[j].prev_out.addr);
                    }
                  }
    
                  if ( f === 1){
                    inputList = [];
                    inputList.push(data.address);
                  }
    
                  var dataOut = data.txs[i].out;
                  var outList  = [];
                  var g = 0;
                  var receivedValue = 0;
                  for (var j=0; j<dataOut.length; j++){
                    if(dataOut[j].addr === data.address){
                      receivedValue += dataOut[j].value;
                      g=1;
                    }
                    else{
                      outList.push(dataOut[j].addr);
                    }
                  }
    
                  if (g === 1){
                    outList = [];
                    outList.push(data.address);
                  }
    
                  var transaction = {};
                  transaction['inputs'] = inputList;
                  transaction['out'] = outList;
                  var transactionDate = this.convertTime(data.txs[i].time);
                  transaction['date'] = transactionDate["date"];
                  transaction['time'] = transactionDate["time"];
                  transaction['hash'] = data.txs[i].hash;
                  transaction['visible'] = false;
    
                  if( f === 1 && g === 1) {
                    transaction['value'] = sentValue - receivedValue;
                    transaction['spent'] = true;
                  }
                  else if ( f === 1) {
                    transaction['value'] = sentValue;
                    transaction['spent'] = true;
                  }
                  else {
                    transaction['value'] = receivedValue;
                    transaction['spent'] = false;
                  }
                  receivedTransactionList.push(transaction);
                }
                if(counter === 1){
                  this.props.updateNewTransactionList([]);
                  this.props.updateOldTransactionList(receivedTransactionList);
                  this.props.updateAllTransactionList(receivedTransactionList);
                }
                else{
                  for(j=0; j<receivedTransactionList.length; j++){
                    if(receivedTransactionList[j] !== this.props.allTransactionList[0]){
                      newTransactionList.push(receivedTransactionList[j]);
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
              this.props.updateWrongAddress(true);
            }
          }
          
          request.send();

        },waitingTime);

    }

    getTransactions = (enteredAddress) => {
      this.props.updateEmptySearch(true);
      this.props.updateIsLoading(true);
      this.props.updateWrongAddress(false);
      this.props.updateNewSearchAddress(enteredAddress);
      var counter = 1;
      this.createTransactionLists(enteredAddress,counter);
    }

    render() {
      return (
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Enter the Bitcoin Address here" onChange={this.handleBitcoinAddressChange()}/>
            <button type="submit" className="searchButton" onClick={() => this.getTransactions(this.props.enteredAddress)}>
                <img src={search_logo} alt="submit" />
            </button>
        </div>
      );
    }
  }

export default Search;