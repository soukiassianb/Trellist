import React, { Component } from 'react';
// import TickIcon from 'react-icons/ti/tick';
const trelloClient = window.trelloClient;


export default class Card extends Component {
    constructor(props) {
        super(props);

        this.handleAnimateButton = this.handleAnimateButton.bind(this);
        this.onItemDoneClick = this.onItemDoneClick.bind(this);

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
        // this.props.itemDone(this.props.id);
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
    render() {
        return (
            <li
                className={this.getClassName()}
                key={this.props.card.id}>
                <button
                    className="done-button"
                    onClick={this.onItemDoneClick}>
                </button>
                {this.props.card.name}
            </li>
        )
    }
}
