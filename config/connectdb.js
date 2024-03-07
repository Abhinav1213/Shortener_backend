const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://mongo:cGgE-2b6A5Da--1dB1ccah22-G3A3E3A@roundhouse.proxy.rlwy.net:55419/?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error(error);
});



module.exports = mongoose.connection;