import React, { Component } from 'react';
const trelloClient = window.trelloClient;


export default class Card extends Component {
    render() {
        return (
            <li
                className="card"
                key={this.props.card.id}>
                {this.props.card.name}
            </li>
        )
    }
}
