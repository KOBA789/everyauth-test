
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

global.everyauth = require('everyauth');

everyauth.twitter
  .consumerKey('YOUR COMSUMER KEY HERE')
  .consumerSecret('YOUR COMSUMER SECRETKSY HERE')
  .findOrCreateUser(function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
    console.log(twitterUserMetadata);
    return twitterUserMetadata.screen_name;
  })
  .entryPath('/auth')
  .callbackPath('/authed')
  .redirectPath('/');

console.log(everyauth);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'nanntara'}));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.get('/post', routes.post);

everyauth.helpExpress(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
