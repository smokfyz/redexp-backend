const storyRoutes = require('./transactions_routes');
const authRoutes = require('./auth_routes');

module.exports = function(app, db) {

  storyRoutes(app, db);
  authRoutes(app, db);

}
