import React, { Component } from 'react';
import Card from './card';

const trelloClient = window.trelloClient;

export default class List extends Component {
    constructor(props) {
        super(props);

        this.handleClickList = this.handleClickList.bind(this);
        this.state = {
            closed:false,
            cards: [],
        }
    }
    loadListCardsFromAPI() {
        trelloClient.getListCards({
            success: (data) => {
                this.setState({
                    cards: Object.keys(data).map(key => data[key])
                });
            }
        }, this.props.list.id);
    }
    componentDidMount() {
        this.loadListCardsFromAPI()
    }
    handleClickList() {
        this.setState({
            closed: !this.state.closed,
        })
    }
    render() {
        let cardList;
        if(this.state.cards.length > 0 && !this.state.closed) {
            cardList = this.state.cards.map((card) => {
                console.log(card);
                return (
                    <Card
                        className="card"
                        card={card}
                    />
                )
            })
        } else { cardList = null;}
        return (
            <div className="list">
                <h4 onClick={this.handleClickList}
                    className={this.state.closed ? 'closed': ''}>
                    {this.props.list.name}
                    <span>
                        {this.state.closed ? this.state.cards.length : ''}
                    </span>
                </h4>
                <ul className="card-list">
                    {cardList}
                </ul>
            </div>
        )
    }
}
