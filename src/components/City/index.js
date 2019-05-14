import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cityDataSelectorFactory} from './../../selectors';
import Layout from './layout';
import {openModal} from './../../AC';


class City extends Component {
  static propTypes = {
    city: PropTypes.object
  };

  state = {
    open: false,
  };


  render() {
    const {cityData} = this.props;

    return (
      <Layout
        cityData = {cityData}
        isOpen = {this.state.open}
        openHandler = {this.openHandler}
        popupHandler = {this.popupHandler}
      />
    )
  }

  openHandler = () => {
    this.setState({
      open: !this.state.open
    })
  };

  popupHandler = (data) => evt => {
    this.props.openModal(data);
  }
}



const mapStateToProps = (state, ownProps) => {
  const cityDataSelector = cityDataSelectorFactory();

  return (state, ownProps) => {
    return {
      cityData: cityDataSelector(state, ownProps),
    }
  }
};



export default connect(mapStateToProps, { openModal })(City);