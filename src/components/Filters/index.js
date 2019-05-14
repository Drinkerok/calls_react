import React, {Component} from 'react';
import {connect} from 'react-redux';

import Layout from './layout';


class Filters extends Component {
  render() {
    const {cities} = this.props;

    return (
      <Layout cities = {cities} />
    )
  }
}



export default connect((state) => ({
  cities: state.cities.entities,
}))(Filters);