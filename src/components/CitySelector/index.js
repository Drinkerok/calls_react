import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.css';
import {selectCity} from './../../AC';
import {mapToArray} from './../utils';
import styled from 'styled-components';


const SelectWrapper = styled.div`
  width: 300px;
`;

class CitySelector extends Component {
  static propTypes = {
    // from connect
    handleSelect: PropTypes.func
  };


  state = {
    selected: null,
  };


  render() {
    const {cities} = this.props;
    const options = mapToArray(cities).map(city => ({
      value: city.id,
      label: city.name,
    }));

    return (
      <SelectWrapper>
        <Select
          options = {options}
          onChange = {this.handleSelect}
          value = {this.state.selected}
          placeholder = {false}
        />
      </SelectWrapper>
    )
  }

  handleSelect = (selected) => {
    this.setState({ selected });
    this.props.selectCity(selected);
  }
}


export default connect(null, {selectCity})(CitySelector);