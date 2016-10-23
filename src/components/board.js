import React, { Component } from 'react';
import List from './list';
import AddItemButton from './add-item-button';
import AddItemForm from './add-item-form';

const trelloClient = window.trelloClient;

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.loadBoardListFromAPI = this.loadBoardListFromAPI.bind(this);
        this.loadBoardFromAPI = this.loadBoardFromAPI.bind(this);
        this.handleShowAddItemForm = this.handleShowAddItemForm.bind(this);
        this.onItemSubmitted = this.onItemSubmitted.bind(this);
        this.state = {
            board: {},
            boardLists: [],
            avatarUrl:'',
            showAddItemForm:false,
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
        }, this.props.boardId);
    }
    getUserAvatar() {
        let loading;
        if (this.state.avatarUrl === '' && !loading) {
            loading = true;
            trelloClient.getAvatar({
                success: (data) => {
                    this.setState({ avatarUrl: data});
                },
            });
        } else if(this.state.avatarUrl === null) {

        } else {
            return (
                <img className="user-avatar" alt="avatar" src={this.state.avatarUrl} />
            )
        }
    }
    componentDidMount() {
        this.loadBoardFromAPI();
        this.loadBoardListFromAPI();
        setInterval(this.loadBoardFromAPI, 5000);
        setInterval(this.loadBoardListFromAPI, 5000);
    }
    handleShowAddItemForm() {
        this.setState({
           showAddItemForm: !this.state.showAddItemForm
        })
    }
    onItemSubmitted(cardName, listId) {
        this.handleShowAddItemForm();
        this.loadBoardListFromAPI()
    }
    render() {
        const userAvatar = this.getUserAvatar();

        let lists;
        if(this.state.boardLists !== '') {
            lists = this.state.boardLists.map((list) => {
                return (
                    <List
                        key={list.id}
                        id={list.id}
                        list={list}
                    />
                )
            })
        } else { lists = null; }

        return (
            <div className="board">
                {userAvatar}
                <h3>
                    {this.state.board.name}
                    <i className="fa fa-random switch-board" onClick={this.props.handleSwitchBoard}></i>
                </h3>
                {lists}
                <AddItemForm
                    showAddItemForm={this.state.showAddItemForm}
                    defaultList={this.state.boardLists[0]}
                    onItemSubmitted={this.onItemSubmitted}
                    lists={this.state.boardLists}
                />
                <AddItemButton
                    showAddItemForm={this.state.showAddItemForm}
                    handleShowAddItemForm={this.handleShowAddItemForm}
                />
            </div>
        )
    }
}
