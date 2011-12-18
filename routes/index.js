
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(this);
  res.render('index', { title: 'Express' });
};

exports.post = function (req, res) {
  everyauth.twitter.oauth.post(everyauth.twitter.apiHost()
			       + '/1/statuses/update.json',
			       req.session.auth.twitter.accessToken,
			       req.session.auth.twitter.accessTokenSecret,
			       {status: 'Node.js から everyauth 経由ではろーはろー'},
			       function (err, data) {
				 //console.log(data);
				 res.send(data);
			       });

};