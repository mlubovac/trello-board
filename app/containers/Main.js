var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


var Main = React.createClass({
    render: function() {
        return <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">ReactJS Starter</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="about">About</Link></li>
                            <li><Link to="contact">Contact</Link></li>                        
                        </ul>
                    </div>
                </div>
            </nav>
            {this.props.children};
        </div>
    }
});

module.exports = Main;
