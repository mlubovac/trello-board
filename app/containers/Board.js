var React = require('react');
var Config = require('../config/config');
var ListPanel = require('../components/ListPanel');
var ListForm = require('../components/ListForm');

var Board = React.createClass({
    
    toggleIsInputMode: function(key) {
        console.log('toggleIsInputMode', key)
        this.setState({inputModeListKey: key});       
    },    
    
    getInitialState: function() {
        return {
            lists: {},
            inputModeListKey: null            
        }
    },
    
    componentDidMount: function() {
        this.listsRef = new Firebase(Config.LISTS_URL);
        this.listsRef.orderByChild('boardKey').equalTo(this.props.params.key).on('value', function(dataSnap) {
            if (this.isMounted()) {
                this.setState({lists: dataSnap.val() || {}});                
            }
        }.bind(this));
    },
    
    render: function() {
        var lists = Object.keys(this.state.lists).map(function(key) {
            var isInputMode = (this.state.inputModeListKey === key) ? true : false;           
            var list = this.state.lists[key];
            list.key = key;
            return <ListPanel key={key} list={list} isInputMode={isInputMode} toggleIsInputMode={this.toggleIsInputMode} />
        }.bind(this));
        
        console.log(this.state.lists)
        return <div className="container-fluid">
            {lists}
            <ListForm boardKey={this.props.params.key} />
        </div>;
    }
});

module.exports = Board;