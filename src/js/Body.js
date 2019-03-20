import React, { Component } from 'react';
import '../css/Body.css';
import Search from './Search.js';
import Details from './Details.js';
import bg from '../media/bg1.png'

class Body extends Component {
    constructor(props) {
      super(props);
      this.state = {
        enteredAddress: '',
        address: '',
        addressHash: '',
        totalReceived: 0,
        totalSent: 0,
        balance: 0,
        emptySearch: true,
        oldTransactionList: [],
        newTransactionList: [],
        allTransactionList: [{
          'hash': ''
        }],
        oldIntervalReference: -1,
        isLoading: false
      }
      this.updateEnteredBitcoinAddress= this.updateEnteredBitcoinAddress.bind(this);

      this.updateBitcoinAddress= this.updateBitcoinAddress.bind(this);
      this.updateBitcoinAddressHash=this.updateBitcoinAddressHash.bind(this);
      this.updateTotalReceived=this.updateTotalReceived.bind(this);
      this.updateTotalSent=this.updateTotalSent.bind(this);
      this.updateBitcoinAccountBalance=this.updateBitcoinAccountBalance.bind(this);

      this.updateOldTransactionList=this.updateOldTransactionList.bind(this);
      this.updateNewTransactionList=this.updateNewTransactionList.bind(this);
      this.updateNewIntervalReference=this.updateNewIntervalReference.bind(this);

      this.updateIsLoading=this.updateIsLoading.bind(this);
    }
    updateEmptySearch = (input) => {
      this.setState({emptySearch: input});
    }
    
    updateEnteredBitcoinAddress = (newAddress) => {
      this.setState({enteredAddress: newAddress});
    }


    updateBitcoinAddress = (newAddress) => {
      this.setState({address: newAddress});
    };

    updateBitcoinAddressHash = (newAddressHash) => {
      this.setState({addressHash: newAddressHash});
    };

    updateTotalReceived = (newTotalReceived) => {
      this.setState({totalReceived: newTotalReceived});
    };

    updateTotalSent = (newTotalSent) => {
      this.setState({totalSent: newTotalSent});
    };

    updateBitcoinAccountBalance = (newBalance) => {
      this.setState({balance: newBalance});
    }


    updateOldTransactionList = (list) => {
      this.setState({oldTransactionList: list});
    }

    updateNewTransactionList = (list) => {
      this.setState({newTransactionList: list});
    }

    updateAllTransactionList = (list) => {
      this.setState({allTransactionList: list});
    }

    updateNewIntervalReference = (refreshId) => {
      this.setState({oldIntervalReference: refreshId});
    }

    updateIsLoading = (input) => {
      this.setState({isLoading: input});
    }
    render() {
      return (
        <div className="body">
          <img className="Background-image" src={bg}/>
          <div className="content">
            <Search
              updateEnteredBitcoinAddress={this.updateEnteredBitcoinAddress}
              updateBitcoinAddress={this.updateBitcoinAddress}
              updateBitcoinAddressHash={this.updateBitcoinAddressHash}
              updateTotalReceived={this.updateTotalReceived}
              updateTotalSent={this.updateTotalSent}
              updateBitcoinAccountBalance={this.updateBitcoinAccountBalance}
              updateOldTransactionList={this.updateOldTransactionList}
              updateNewTransactionList={this.updateNewTransactionList}
              updateAllTransactionList={this.updateAllTransactionList}
              enteredAddress={this.state.enteredAddress }
              address={this.state.address}
              balance={this.state.balance}
              oldTransactionList={this.state.oldTransactionList}
              newTransactionList={this.state.newTransactionList}
              allTransactionList={this.state.allTransactionList}
              updateEmptySearch={this.updateEmptySearch}
              oldIntervalReference={this.state.oldIntervalReference}
              updateNewIntervalReference={this.updateNewIntervalReference}
              updateIsLoading={this.updateIsLoading}
            />
            <Details
              address={this.state.address}
              addressHash={this.state.addressHash}
              totalReceived={this.state.totalReceived}
              totalSent={this.state.totalSent}
              balance={this.state.balance}
              oldTransactionList={this.state.oldTransactionList}
              newTransactionList={this.state.newTransactionList}
              emptySearch={this.state.emptySearch}
              isLoading={this.state.isLoading}
            />
          </div>
        </div>
      );
    }
  }

export default Body;