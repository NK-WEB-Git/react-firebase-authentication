import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import { PASSWORD_FORGET } from '../constants/routes';

const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  byPropKey(propertyName, value) {
    return function () {
      return {
        [propertyName]: value,
      };
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        this.setState(this.byPropKey('error', error));
      });
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(this.byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};