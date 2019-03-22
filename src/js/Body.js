import React, { Component } from 'react';
import '../css/Body.css';
import Search from './Search.js';
import Details from './Details.js';

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
        n_tx: 0,
        emptySearch: true,
        oldTransactionList: [],
        newTransactionList: [],
        allTransactionList: [{
          'hash': ''
        }],
        isLoading: false,
        lastAPICall: Math.round(+new Date()/1000),
        isWrongAddress: false,
        newSearchAddress:'',
        offSet: 0
      }
      this.updateEnteredBitcoinAddress= this.updateEnteredBitcoinAddress.bind(this);

      this.updateBitcoinAddress= this.updateBitcoinAddress.bind(this);
      this.updateBitcoinAddressHash=this.updateBitcoinAddressHash.bind(this);
      this.updateTotalReceived=this.updateTotalReceived.bind(this);
      this.updateTotalSent=this.updateTotalSent.bind(this);
      this.updateBitcoinAccountBalance=this.updateBitcoinAccountBalance.bind(this);
      this.update_n_tx=this.update_n_tx.bind(this);

      this.updateOldTransactionList=this.updateOldTransactionList.bind(this);
      this.updateNewTransactionList=this.updateNewTransactionList.bind(this);

      this.toggleTransactionVisibility=this.toggleTransactionVisibility.bind(this);

      this.updateIsLoading=this.updateIsLoading.bind(this);

      this.updateLastAPICall=this.updateLastAPICall.bind(this);

      this.updateWrongAddress=this.updateWrongAddress.bind(this);
      this.updateNewSearchAddress=this.updateNewSearchAddress.bind(this);

      this.updateOffSet=this.updateOffSet.bind(this);
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

    update_n_tx = (new_n_tx) => {
      this.setState({n_tx: new_n_tx});
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

    updateIsLoading = (input) => {
      this.setState({isLoading: input});
    }

    updateLastAPICall = (newTime) => {
      this.setState({lastAPICall: newTime});
    }

    updateWrongAddress = (input) => {
      this.setState({isWrongAddress: input});
    }

    updateNewSearchAddress = (newAddress) => {
      this.setState({newSearchAddress: newAddress});
    }

    updateOffSet = (newOffSet) => {
      this.setState({offSet: newOffSet});
    }

    toggleTransactionVisibility = (index, isNew) => {
      if (isNew) {
        var temp = !this.state.newTransactionList[index].visible;
        var tempNewTransactionList = this.state.newTransactionList;
        tempNewTransactionList[index].visible = temp;

        var tempAllTransactionList = this.state.allTransactionList;
        tempAllTransactionList[index].visible = temp;
        this.setState({
          newTransactionList: tempNewTransactionList,
          allTransactionList: tempAllTransactionList
        })
      }
      else {
        var temp = !this.state.oldTransactionList[index].visible;
        var tempIndex = index + this.state.newTransactionList.length;

        var tempOldTransactionList = this.state.oldTransactionList;
        tempOldTransactionList[index].visible = temp;

        var tempAllTransactionList = this.state.allTransactionList;
        tempAllTransactionList[tempIndex].visible = temp;
        this.setState({
          oldTransactionList: tempOldTransactionList,
          allTransactionList: tempAllTransactionList
        })
      }

      
      
    }
    render() {
      return (
        <div className="body">
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
              update_n_tx={this.update_n_tx}
              enteredAddress={this.state.enteredAddress }
              address={this.state.address}
              balance={this.state.balance}
              n_tx={this.state.n_tx}
              oldTransactionList={this.state.oldTransactionList}
              newTransactionList={this.state.newTransactionList}
              allTransactionList={this.state.allTransactionList}
              emptySearch={this.state.emptySearch}
              updateEmptySearch={this.updateEmptySearch}
              oldIntervalReference={this.state.oldIntervalReference}
              updateIsLoading={this.updateIsLoading}
              lastAPICall={this.state.lastAPICall}
              updateLastAPICall={this.updateLastAPICall}
              updateWrongAddress={this.updateWrongAddress}
              isWrongAddress={this.state.isWrongAddress}
              updateNewSearchAddress={this.updateNewSearchAddress}
              newSearchAddress={this.state.newSearchAddress}
              offSet={this.state.offSet}
              updateOffSet={this.updateOffSet}
            />
            {
              this.state.emptySearch && !this.state.isLoading &&
              <div className="home-body">
                <div className="welcome-message">Please limit your queries to a maximum of 1 every 10 seconds, because of API call limitations.</div>
                <iframe src="https://giphy.com/embed/GMIbzgzyS4pws" width="480" height="266" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
              </div>
              
            }
              <Details
              address={this.state.address}
              addressHash={this.state.addressHash}
              totalReceived={this.state.totalReceived}
              totalSent={this.state.totalSent}
              balance={this.state.balance}
              n_tx={this.state.n_tx}
              oldTransactionList={this.state.oldTransactionList}
              newTransactionList={this.state.newTransactionList}
              emptySearch={this.state.emptySearch}
              isLoading={this.state.isLoading}
              toggleTransactionVisibility={this.toggleTransactionVisibility}
              isWrongAddress={this.state.isWrongAddress}
            />
          </div>
        </div>
      );
    }
  }

export default Body;