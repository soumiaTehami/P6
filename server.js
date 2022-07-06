console.log("hello")
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000
app.get('/', (req, res) => {
   res.send('Hello World!')
 })
 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })
 mongoose.connect("mongodb+srv://tehami:1988soumia@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority", function(err) {
  if (err) { throw err;
  }
  else { console.log("connecté base")}
});dddd