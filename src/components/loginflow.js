import React, { Component } from 'react';
import LoginButton from './loginbutton';
import BoardList from './boardlist'

export default class LoginFlow extends Component {
    render() {
        let LoginStep;
        if(this.props.authenticated && this.props.selectedBoard !== '') {
        // logged in + board selected
            LoginStep = null;
        } else if(this.props.authenticated && this.props.selectedBoard === ''){
        // logged in but no board selected yet
            LoginStep = (
                <BoardList
                    authenticated={this.props.authenticated}
                    handleBoardButtonClick={this.props.setSelectedBoard}
                />)
        } else {
        // logged out
            LoginStep = (
                <LoginButton
                    authenticated={this.props.authenticated}
                    onAuthenticationSuccess={this.props.onAuthenticationSuccess}
                />)
        }
        return (
            <div>
                {LoginStep}
            </div>
        )
    }
}
