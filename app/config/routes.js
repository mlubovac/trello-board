var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Main = require('../containers/Main');
var Home = require('../containers/Home');
var About = require('../containers/About');
var Contact = require('../containers/Contact');

var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
        </Route>
    </Router>
);

module.exports = routes;