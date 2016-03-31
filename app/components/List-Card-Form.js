var React = require('react');
var Config = require('../config/config');

var ListCardForm = React.createClass({
    
    style: {
    //   paddingTop: "20px"      
    },
    
    toggleIsInputMode: function(event) {
        this.props.toggleIsInputMode(this.props.listKey);
        setTimeout(function() {
            this.refs.text.focus();            
        }.bind(this));
    },
    
    toggleIsSaveDisabled: function() {
        this.setState({isSaveDisabled: (this.refs.text.value.length < this.MIN_LENGTH)})        
    },
    
    handleSubmit: function(event) {
        event.preventDefault();
        var card = {
            listKey: this.props.listKey,
            text: this.refs.text.value
        };
        this.cardsRef.push(card);
        this.refs.text.value = '';
        this.toggleIsSaveDisabled();
        this.props.toggleIsInputMode(null);
    },
    
    handleCancel: function(event) {
        this.toggleIsSaveDisabled();        
        this.props.toggleIsInputMode(null);                
    },
    
    getInitialState: function() {
        return {
            isInputMode: false,
            isSaveDisabled: true
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        this.setState({isInputMode: nextProps.isInputMode}); 
    },
    
    componentDidMount: function() {
        this.MIN_LENGTH = 5;
        this.cardsRef = new Firebase(Config.CARDS_URL);
    },
    
    render: function() {
        return <div>
            {!this.state.isInputMode ? 
                <div>
                    <p style={{textAlign: 'right'}}><a href="javascript:void(0);" onClick={this.toggleIsInputMode}>Add Card</a></p>
                </div>
            :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <textarea className="form-control" ref="text" onChange={this.toggleIsSaveDisabled} required></textarea>
                        </div>
                        <div className="form-group">                                               
                            <input type="submit" className="btn btn-primary" disabled={this.state.isSaveDisabled} value="Save" /> &nbsp;
                            <input type="button" className="btn btn-default" value="Cancel" onClick={this.handleCancel}/>                            
                        </div>
                    </form>
                </div>
            }
        </div>;
    }
});

module.exports = ListCardForm;