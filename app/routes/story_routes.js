module.exports = function(app, db) {

  app.post('/story', (req, res) => {
    console.log(req.body);
    res.send('Hello');
  });

}
