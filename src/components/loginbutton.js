import React, { Component } from 'react';

const trelloClient = window.trelloClient;

export default class LoginButton extends Component {
    constructor(props) {
        super(props);

        this.onClickLoginButton = this.onClickLoginButton.bind(this);
    }
    onClickLoginButton() {
        trelloClient.Login({
            authenticationSuccess: (data) => {
                this.props.onAuthenticationSuccess();
            }
        });
    }
    render() {
        return (
            <div className="login-button-wrapper">
                <h3>A minimalist Trello client</h3>
                <button
                    className="base-button blue"
                    onClick={this.onClickLoginButton}>
                    Login with Trello
                </button>
                <p>
                    You'll need a Trello account to log-in.
                    Get yours at <a target="_blank" href="https://trello.com/">trello.com.</a>
                A project by Benjamin Soukiassian. Check the source code on Github.
                </p>
            </div>
        )
    }
}
