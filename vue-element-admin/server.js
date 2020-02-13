var express = require('express');
var app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

// Handle a get request to an api route

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});