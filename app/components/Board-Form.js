var React = require('react');
var Config = require('../config/config');

var BoardForm = React.createClass({
    
    style: {
      display: "block"      
    },
    
    toggleInputMode: function(event) {
        this.setState({isInputMode: !this.state.isInputMode}, function() {
            if (this.state.isInputMode) {
                setTimeout(function() {
                    this.refs.name.focus();            
                }.bind(this));
            }          
        });
    },
    
    toggleIsSaveDisabled: function() {
        this.setState({isSaveDisabled: (this.refs.name.value.length < this.MIN_LENGTH)});
    },
    
    handleSubmit: function(event) {
        event.preventDefault();
        this.boardsRef.push({name: this.refs.name.value});
        this.refs.name.value = '';
        this.toggleInputMode();
        this.toggleIsSaveDisabled();
    },
    
    handleChange: function(event) {
        this.toggleIsSaveDisabled();
    },
    
    getInitialState: function() {
        return {
            isInputMode: false,
            isSaveDisabled: true
        }
    },
    
    componentDidMount: function() {
        this.MIN_LENGTH = 3;
        this.boardsRef = new Firebase(Config.BOARDS_URL);
    },
    
    render: function() {
        return <div className="col-lg-3">
            <div className="panel panel-default">
                <div className="panel-body">
                {
                    !this.state.isInputMode ?
                    <p><a href="javascript:void(0)" style={this.style} onClick={this.toggleInputMode}>Create new board...</a></p>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="New board name..." ref="name" onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Save" disabled={this.state.isSaveDisabled} /> &nbsp;
                            <input type="button" className="btn btn-default" value="Cancel" onClick={this.toggleInputMode} />
                        </div>
                    </form>
                }
                </div>
            </div>
        </div>;
    }
});

module.exports = BoardForm;