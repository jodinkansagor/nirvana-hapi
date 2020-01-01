  
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: Date,
  venue: String,
  city: String,
  state: String,
  country: String,
  recorded: String
});

module.exports = mongoose.model('Nirvana', schema);
