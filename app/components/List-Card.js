var React = require('react');
var Config = require('../config/config');

var ListCard = React.createClass({

    propTypes: {
        card: React.PropTypes.object.isRequired
    },

    style: {
        position: "absolute",
        right: 5,        
        top: 0
    },

    handleOnClick: function() {
        this.cardsRef.child(this.props.card.key).remove();
    },

    componentDidMount: function() {
        this.cardsRef = new Firebase(Config.CARDS_URL);
    },

    handleOnDragStart: function(event) {
        event.dataTransfer.setData('card', JSON.stringify(this.props.card));
    }, 

    render: function() {
        return <div className="card" draggable="true" onDragStart={this.handleOnDragStart}>
            <p>{this.props.card.text}</p>
            {/*
            <div style={this.style}>
                <button className="close" onClick={this.handleOnClick}>x</button>
            </div>
            */}
        </div>;
    }
});

module.exports = ListCard;