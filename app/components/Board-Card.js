var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var BoardCard = React.createClass({
    render: function() {
        return <div className="col-md-3"> 
            <div className="panel panel-default">
                <div className="panel-body">
                    <h4><Link to={"/board/" + this.props.board.key}>{this.props.board.name}</Link></h4>
                    <p><Link to={"/board/" + this.props.board.key}>View more &raquo;</Link></p>
                </div>
            </div>
        </div>;
    }
});

module.exports = BoardCard;