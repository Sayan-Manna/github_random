const User = require("./User");
const Post = require("./Post");

// Define relationships
User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post,
};
