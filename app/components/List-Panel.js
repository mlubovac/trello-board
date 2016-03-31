var React = require('react');
var Config = require('../config/config');
var ListCard = require('./list-card');
var ListCardForm = require('./list-card-form');

var ListPanel = React.createClass({
    
    // propTypes: {
        // list: React.PropTypes.object.isRequired,
        // opened: React.PropTypes.bool.isRequired,
        // toggleOpenedCard: React.PropTypes.func.isRequired
    // },

    handleOnDragOver: function(event) {
        event.preventDefault();
        //  this method must exist in order for drag/drop to work
    },
    
    handleOnDragLeave: function(event) {
        event.preventDefault();
        //  this method must exist in order for drag/drop to work
    },
    
    handleOnDrop: function(event) {
        event.preventDefault();
        var card = JSON.parse(event.dataTransfer.getData('card'));
        card.listKey = this.props.list.key;
        var key = card.key;
        delete card.key;
        this.cardsRef.child(key).update(card);
    },    
    
    getInitialState: function() {
        return {
            cards: {}
        }
    },
    
    componentDidMount: function() {
        this.cardsRef = new Firebase(Config.CARDS_URL);
        this.cardsRef = new Firebase(Config.CARDS_URL);    
        this.cardsRef.orderByChild('listKey').equalTo(this.props.list.key).on('value', function(dataSnap) {
            if (this.isMounted()) {
                this.setState({cards: dataSnap.val() || {}});
            }           
        }.bind(this));
    },
       
    render: function() {
        
        var cards = Object.keys(this.state.cards).map(function(key) {
            var card = this.state.cards[key];
            card.key = key;
            return <ListCard key={key} card={card} />;
        }.bind(this));        
        
        return <div className="col-md-2" onDragOver={this.handleOnDragOver} onDragLeave={this.handleOnDragLeave} onDrop={this.handleOnDrop}>
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.list.name}
                </div>            
                <div className="panel-body">
                    {cards}
                </div>
                <div className="panel-footer">
                    <ListCardForm listKey={this.props.list.key} isInputMode={this.props.isInputMode} toggleIsInputMode={this.props.toggleIsInputMode} />
                </div>                            
            </div>
        </div>;
    }
});

module.exports = ListPanel;