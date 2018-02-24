const mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
let CurrentArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
let CurrentArticle = mongoose.model("CurrentArticle", CurrentArticleSchema);

// Export the Article model
module.exports = CurrentArticle;