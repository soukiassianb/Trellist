import React, { Component } from 'react';

const trelloClient = window.trelloClient;

export default class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        }
        this.loadBoardsFromAPI = this.loadBoardsFromAPI.bind(this);
        this.onBoardButtonClick = this.onBoardButtonClick.bind(this);
    }
    componentDidMount() {
        this.loadBoardsFromAPI();
    }
    loadBoardsFromAPI() {
        trelloClient.getBoards({
            success: (data) => {
                this.setState({
                    boards: Object.keys(data).map(key => data[key])
                });
            }
        });
    }
    onBoardButtonClick(btn) {
        this.props.handleBoardButtonClick(btn.target.id);
    }
    render() {
        let boardlist
        if(this.state.boards.length > 0) {
            boardlist = this.state.boards.map((board) => {
                return (
                    <button
                        key={board.id}
                        id={board.id}
                        className="base-button choose-board"
                        onClick={this.onBoardButtonClick}>
                        {board.name}
                    </button>
                )
            });
        } else {
            boardlist = null;
        }
        return (
            <div className="board-list">
                <h3>Select a board:</h3>
                {boardlist}
            </div>
        )
    }
}
