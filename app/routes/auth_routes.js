const bcrypt = require('bcrypt');

module.exports = function(app, db) {

  app.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const user = db.collection('users').findOne({username: req.body.username}, (err, user) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      }
      if(user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if(result === true) {
            req.session.userId = user._id;
            res.send({success: true});
          } else {
            res.send({ 'error': 'User not found.' });
          }
        });
      }
    });
  });

  app.get('/logout', (req, res) => {
    if(req.session && req.session.userId) {
      req.session.destroy((err) => {
        if(err) res.send({ 'error': err });
      });
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });

  app.post('/signin', (req, res) => {
    if(req.body.username && req.body.password) {
      const user_data = {
        username: req.body.username,
        password: req.body.password
      }

      bcrypt.hash(user_data.password, 10, (err, hash) => {
        if(err) {
          res.send({ 'error': 'An error has occurred' });
        }
        user_data.password = hash;
        db.collection('users').insert(user_data, (err, result) => {
          if(err) {
            res.send({ 'error': 'An error has occurred' });
          } else {
            res.send(result.ops[0]);
          }
        });
      });
    }
  });

}
