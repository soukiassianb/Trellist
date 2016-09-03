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
                    cards: Object.keys(data).map(key => data[key]),
                });
            }
        }, this.props.list.id);
    }
    componentDidMount(){
        this.loadListCardsFromAPI();
    }
    componentWillReceiveProps(){
        this.loadListCardsFromAPI()
    }
    handleClickList() {
        this.setState({
            closed: !this.state.closed,
        })
    }
    render() {
        let cardList;
        if(!this.state.closed) {
            cardList = this.state.cards.map((card) => {
                return (
                    <Card
                        key={card.id}
                        className="card"
                        card={card}
                    />
                )
            });
        } else { cardList = null;}
        return (
            <div className="list">
                <h4 onClick={this.handleClickList}
                    className={this.state.closed ? 'closed': ''}>
                    {this.props.list.name}&nbsp;{this.state.closed ? '('+this.state.cards.length+')' : ''}
                    <span>
                        <i className={this.state.closed ? 'i fa fa-chevron-left':'i fa fa-chevron-down'}></i>
                    </span>
                </h4>
                <ul className="card-list">
                    {cardList}
                </ul>
            </div>
        )
    }
}
