const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/story/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('transactions').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/story', (req, res) => {
    const transaction = {
      type: req.body.type,
      amount: req.body.amount,
      currency: req.body.currency,
      date: req.body.date,
      reason: req.body.reason
    }
    db.collection('transactions').insert(transaction, (err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0]);
      }
    });
  });

}
