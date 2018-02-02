const storyRoutes = require('./story_routes');

module.exports = function(app, db) {

  storyRoutes(app, db);
  
}
