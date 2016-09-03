import React, { Component } from 'react';

const trelloClient = window.trelloClient;

export default class AddItemForm extends Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmitNewItem = this.handleSubmitNewItem.bind(this);
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
          this.handleSubmitNewItem(e);
      } // else close form if escape
    }
    handleSubmitNewItem(e){
        const cardName = e.target.value;
        const cardListId = this.refs.listOption.value;

        trelloClient.addCard({
            success:(data) => {
            }
        }, cardName, cardListId);

        this.props.onItemSubmitted();
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
                                onKeyPress={this.handleKeyPress}
                                />
                            <select name="select-list">
                              {selectListOptions}
                            </select>
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
