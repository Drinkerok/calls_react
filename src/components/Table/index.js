import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadData} from './../../AC';
import {filteredCitiesSelector} from './../../selectors';
import Layout from './layout';



class Table extends Component {
  static proptypes = {
    // from connect
    cities: PropTypes.array
  };


  componentDidMount() {
    const {loaded, loadData} = this.props;
    if (!loaded) loadData();
  }


  render() {
    const {cities, isModalOpen} = this.props;


    return (
      <Layout cities = {cities} isModalOpen = {isModalOpen} />
    )
  }
}







export default connect(state => ({
  cities: filteredCitiesSelector(state),
  loading: state.cities.loading,
  loaded: state.cities.loaded,
  isModalOpen: state.modal.open
}), { loadData })(Table);