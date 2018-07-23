import React, { Component } from 'react';

import { auth } from '../firebase';

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordOne: '',
            passwordTwo: '',
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
        const { passwordOne } = this.state;

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                console.log('success');
            })
            .catch(error => {
                this.setState(this.byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    value={passwordOne}
                    onChange={event => this.setState(this.byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(this.byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
        </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default PasswordChangeForm;