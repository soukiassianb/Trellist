import React, { Component } from 'react';
import LoginFlow from './components/loginflow';
import Board from './components/board';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            selectedBoard:'',
        }
    }
    render() {
        let board;
        if(this.state.selectedBoard !== ''){
            board = (
                <Board
                    boardId={this.state.selectedBoard}
                />
            )
        } else {
            board = null;
        }
        return (
            <div className="App">
                <h1>Daily for Trello</h1>
                <LoginFlow
                  authenticated={this.state.authenticated}
                  selectedBoard={this.state.selectedBoard}
                  onAuthenticationSuccess={() => this.setState({ authenticated: true})}
                  setSelectedBoard={(boardId) => this.setState({ selectedBoard: boardId})}
                />
                {board}
            </div>
        );
    }
}

export default App;
