import React, { Component } from 'react';
import List from './list';
const trelloClient = window.trelloClient;

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.loadBoardListFromAPI = this.loadBoardListFromAPI.bind(this);
        this.loadBoardFromAPI = this.loadBoardFromAPI.bind(this);
        this.state = {
            board: {},
            boardLists: [],
        }
    }
    loadBoardListFromAPI() {
        trelloClient.getBoardLists({
            success: (data) => {
                this.setState({
                    boardLists: Object.keys(data).map(key => data[key])
                });
            }
        }, this.props.boardId)
    }
    loadBoardFromAPI() {
        trelloClient.getBoard({
            success: (data) => {
                this.setState({ board: data});
            }
        }, this.props.boardId)
    }
    componentDidMount() {
        this.loadBoardFromAPI();
        this.loadBoardListFromAPI();
    }
    render() {
        let lists;
        if(this.state.boardLists !== '') {
            lists = this.state.boardLists.map((list) => {
                return (
                    <List
                        key={list.id}
                        list={list}
                    />
                )
            })
        } else { lists = null; }

        return (
            <div>
                <h3>{this.state.board.name}</h3>
                {lists}
            </div>
        )
    }
}
