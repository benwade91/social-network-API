const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

mongoose.connect('mongodb://localhost/social-network-API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(3001, () => console.log(`🌍 Connected on localhost: 3001`));
