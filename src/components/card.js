import React, { Component } from 'react';
import Linkify from 'react-linkify';

const trelloClient = window.trelloClient;


export default class Card extends Component {
    constructor(props) {
        super(props);

        this.handleAnimateButton = this.handleAnimateButton.bind(this);
        this.onItemDoneClick = this.onItemDoneClick.bind(this);
        this.getCardLabelsAsHashtags = this.getCardLabelsAsHashtags.bind(this);
        this.getCardLabelsAsColorLabels = this.getCardLabelsAsColorLabels.bind(this);

        this.state = {
            'animatebutton': false,
            'active': true,
        }
    }
    handleAnimateButton(){
        this.setState({
            animatebutton: !this.state.animatebutton
        });
        setTimeout(()=> {
            this.setState({
                animatebutton: !this.state.animatebutton
            });
        }, 350);
    }
    onItemDoneClick() {
        trelloClient.closeCard({
            success: (data) => {
                return;
            }
        }, this.props.card.id, this.state.active);
        this.setState({
            active: !this.state.active
        });
        this.handleAnimateButton();
    }
    getClassName() {
        if(this.state.active){
            return 'card active'
        } else {
            if(this.state.animatebutton){
                return 'card inactive animate';
            } else {
                return 'card inactive';
            }
        }
    }
    getCardLabelsAsHashtags() {
        if(this.props.card.labels.length > 0) {
            const cardsLabels = this.props.card.labels.map((label) => {
                if(label.name.length > 0) {
                    return (
                        <span
                            key={Math.random()}
                            className="hashtag">
                            #{label.name}
                        </span>
                    )
                }
            });
            return cardsLabels;
        }
    }
    getCardLabelsAsColorLabels() {
        if(this.props.card.labels.length > 0) {
            const colorLabels = this.props.card.labels.map((label) => {
                return (
                    <span key={Math.random()} className={label.color}></span>
                )
            })
            return (
                <div
                    key={this.props.card.id}
                    className="color-labels">
                    {colorLabels}
                </div>
            )
        }
    }
    render() {
        const cardLabelsAsHashtags = this.getCardLabelsAsHashtags();
        const cardLabelsAsColorLabels = this.getCardLabelsAsColorLabels();
        return (
            <li
                className={this.getClassName()}
                key={this.props.card.id}>
                <button
                    className="done-button"
                    onClick={this.onItemDoneClick}>
                </button>
                <Linkify properties={{target: '_blank'}}>
                    {this.props.card.name}
                </Linkify>
                {cardLabelsAsHashtags}
                {cardLabelsAsColorLabels}
                &nbsp;
                <a className="open-card-on-trello" target="_blank" href={this.props.card.url}>
                    <i className="fa fa-pencil"></i>
                </a>
            </li>
        )
    }
}
