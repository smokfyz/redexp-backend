const storyRoutes = require('./transactions_routes');

module.exports = function(app, db) {

  storyRoutes(app, db);

}
