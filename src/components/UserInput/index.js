import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeName} from './../../AC';
import styled from 'styled-components';


const Input = styled.input`
  height: 40px;
  font-size: 24px;
  padding: 5px;
  width: 300px;

  &:focus {
    outline: none;
  }
`;


class UserInput extends Component {
  state = {
    value: ``
  };

  render() {
    return (
      <Input value = {this.state.value} onChange = {this.inputHandler} />
    )
  }

  inputHandler = (evt) => {
    const value = evt.target.value;

    this.setState({value});
    this.props.changeName(value);
  }
}



export default connect(null, {changeName})(UserInput);