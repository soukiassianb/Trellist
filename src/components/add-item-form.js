import React, { Component } from 'react'

const trelloClient = window.trelloClient

export default class AddItemForm extends Component {
    constructor (props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmitNewItem = this.handleSubmitNewItem.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleListChange = this.handleListChange.bind(this);

        this.state = {
            selectedList: '',
            cardName: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.showAddItemForm && this.state.selectedList === ''){
            this.setState({
                selectedList: this.props.lists[0].id
            })
        }
    }
    handleKeyPress (e) {
        if (e.key === 'Enter') {
          this.handleSubmitNewItem(e);
      } // else close form if escape
    }
    handleSubmitNewItem(e){
        const cardName = this.state.cardName;
        const cardListId = this.state.selectedList;
        debugger;
        trelloClient.addCard({
            success:(data) => {
            }
        }, cardName, cardListId);

        this.props.onItemSubmitted();
    }
    handleNameChange(e) {
        this.setState({cardName: e.target.value});
    }
    handleListChange(e) {
        this.setState({selectedList: e.target.value});
    }
    render() {
        if(this.props.showAddItemForm){
            const selectListOptions = this.props.lists.map((list) => {
                return (
                    <option key={list.id} value={list.id} ref="listOption">{list.name}</option>
                )
            });

            return (
                <div>
                    <div className="form-overlay"></div>
                    <div className="todo-item-input">
                        <div className="wrapper">
                        <input
                            autoFocus
                            type='text'
                            ref='todoiteminput'
                            value={this.state.cardName}
                            onChange={this.handleNameChange}
                            onKeyPress={this.handleKeyPress}
                            />
                            <span className="dropdown">
                                <select ref="list-selected" name="select-list" value={this.state.selectedList} onChange={this.handleListChange}>
                                  {selectListOptions}
                                </select>
                            </span>
                            <button onClick={this.handleSubmitNewItem}>Add +</button>
                        </div>
                        <div className="bottom-triangle"></div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}
