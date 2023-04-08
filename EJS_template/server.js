const express = require('express');

app = express();

// set view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/about', (req, res) => {
  res.render('aboutUs.ejs');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(9000, () => console.log('Server Connected'));
