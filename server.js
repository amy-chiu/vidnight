var http = require('http');
var express = require('express');
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/vidnightAngular');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());  

//Define model --> document schema in mongo collection
var boardSchema = new mongoose.Schema({  title : String, image : String })
var Board = mongoose.model('Board', boardSchema);
var pinSchema = new mongoose.Schema({  url : String })
var Pin = mongoose.model('Pin', pinSchema);

app.use(session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
}));

// req.session.user = username  --> set a session.user prop. this will get sent back to the client in the header and sets it in the client cookie

app.get('/api/boards', function(req,res) {
  //Find each board that matches the specified constraints of this model. In this case there are no constraints
  Board.find({}, function(err, boards) {
    if(err) {
      res.send(err);
    }
    res.json(boards);
    console.log("boards: " + boards)
  });
});


app.post('/api/boards', function(req, res) {
  console.log(req.body)
  console.log(req.body.text);
  Board.create({
    title: req.body.text,
    image: req.body.image
  }, function(err, board){
    if(err) {
      res.send(err)
    }
    Board.find({}, function(err, boards) {
      if(err) {
        res.send(err);
      }
      res.send(boards);
    })

  })

  // .then(function(board){
  //   Board.find({}, function(err, boards) {
  //     if(err) {res.send(err);}
  //     res.send(boards);
  //   })
  // })
  // .catch(function(data){
  //   res.send(data)
  // })

});

app.delete('/api/boards/:board_id', function(req, res) {
  console.log("i hit server delete")
  console.log(req.params)

  Board.remove({_id: req.params.board_id}, function(err, board) {
    if(err) {
      res.send(err)
    }

    Board.find({}, function(err, boards) {
      if(err) {
        res.send(err)
      }
      res.send(boards);
    })

  })

})

//when the server recevies a get request for '/' endpoint
app.get('*', function(req, res) {
    res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



app.listen(8000);
console.log("App listening on port 8000");

