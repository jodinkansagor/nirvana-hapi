  
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  venue: String,
  city: String,
  state: String,
});

module.exports = mongoose.model('Nirvana', schema);
