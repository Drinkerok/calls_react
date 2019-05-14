import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './../store';
import Table from './Table';
import Filters from './Filters';
import './main.css';

class App extends Component {

  render() {
    return (
      <Provider store = {store} >
        <div>
          <Filters />
          <Table />
        </div>
      </Provider>
    )
  }
}



export default App;