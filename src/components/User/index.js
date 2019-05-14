import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';


class User extends Component {
  static propTypes = {
    user: PropTypes.object
  };


  render() {
    const {user, popupHandler} = this.props;

    return (
      <Layout
        user = { user }
        popupHandler = { popupHandler }
      />
    )
  }
}



export default User;


