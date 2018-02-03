const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/transactions', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.collection('transactions').find().sort({_id:-1}).limit(100).toArray((err, items) => {
      if(err) {
        res.send({ 'error': err })
      } else {
        res.send(items);
      }
    });
  });

  app.post('/transactions', (req, res) => {
    const transaction = {
      type: req.body.type,
      amount: req.body.amount,
      currency: req.body.currency,
      date: req.body.date,
      reason: req.body.reason
    }

    res.setHeader("Access-Control-Allow-Origin", "*");

    db.collection('transactions').insert(transaction, (err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0]);
      }
    });
  });

}
