var React = require('react');
var BoardCard = require('../components/BoardCard');
var BoardForm = require('../components/BoardForm');
var Config = require('../config/config');

var Home = React.createClass({
    
    getInitialState: function() {
        return {
            boards: {}
        }    
    },
    
    componentDidMount: function() {
        this.firebase = new Firebase(Config.BOARDS_URL);
        this.firebase.on('value', function(dataSnap) {
            if (this.isMounted()) {
                this.setState({boards: dataSnap.val() || {}});              
            }
        }.bind(this));  
    },
    
    render: function() {
        
        var cards = Object.keys(this.state.boards).map(function(key) {
            var board = this.state.boards[key];
            board.key = key;
            return <BoardCard key={key} board={board} />
        }.bind(this));
        
        return <div className="container-fluid">
            {cards}
            <BoardForm />
        </div>;
    }    
});

module.exports = Home;