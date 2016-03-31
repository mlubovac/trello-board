var React = require('react');
var Config = require('../config/config');

var ListForm = React.createClass({

    propTypes: {
        boardKey: React.PropTypes.string.isRequired
    },
    
    getInitialState: function() {
        return {
            name: '',
            isSaveDisabled: true
        }    
    },

    isNameValid: function() {
        this.setState({isSaveDisabled: (this.state.name.length < this.NAME_MIN_LENGTH)})    
    },

    handleChange: function(event) {
        this.setState({name: event.target.value});
        this.isNameValid();        
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var list = {
            boardKey: this.props.boardKey,
            name: this.refs.name.value
        };
        this.listsRef.push(list);
        this.refs.name.value = '';
        this.setState({
            name: '',
            isSaveDisabled: true
        });        
    },
    
    componentDidMount: function() {
        this.NAME_MIN_LENGTH = 3;
        this.listsRef = new Firebase(Config.LISTS_URL);
    },
    
    render: function() {
        return <div className="col-md-2">
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.state.name.length > 0 ? this.state.name : 'List Name'}
                </div>            
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="New list name..." ref="name" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Save" disabled={this.state.isSaveDisabled} /> &nbsp;
                            <input type="button" className="btn btn-default" value="Cancel" />
                        </div>
                    </form>
                </div>
            </div>
        </div>;
    }

});

module.exports = ListForm;