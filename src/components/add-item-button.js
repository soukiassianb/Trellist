import React, { Component } from 'react';

export default class AddItemButton extends Component {
    constructor(props) {
        super(props);
        // this.state = {}
        this.onClickShowAddItemForm = this.onClickShowAddItemForm.bind(this);
    }
    onClickShowAddItemForm() {
        this.props.handleShowAddItemForm();
    }
    render() {
        return (
            <div className="add-item-button-wrapper">
                <button
                    className={this.props.showAddItemForm ? 'add-item-button close' : 'add-item-button'}
                    onClick={this.onClickShowAddItemForm}
                    >
                    <div>+</div>
                </button>
            </div>
        )
    }
}
