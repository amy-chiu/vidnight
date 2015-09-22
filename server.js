var http = require('http');
var express = require('express');
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());  

// -----------------------MONGOOSE SCHEMA --------------------

//Define model --> document schema in mongo collection
var boardSchema = new mongoose.Schema({
  title: String, 
  image: String,
  pins: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pin'}] 
})

var Board = mongoose.model('Board', boardSchema);

var pinSchema = new mongoose.Schema({
  link: String, 
  board: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}]
})

var Pin = mongoose.model('Pin', pinSchema);
mongoose.connect('mongodb://localhost/vidnightAngular');

// ------------------------USER SESSION STUFF (WHEN THE TIME COMES) --------------

// app.use(session({
//     secret: "mysecret",
//     resave: true,
//     saveUninitialized: true,
// }));

// req.session.user = username  --> set a session.user prop. this will get sent back to the client in the header and sets it in the client cookie

// ----------------------BOARDS -------------------------


app.get('/boards', function(req,res) {
  //Find each board that matches the specified constraints of this model. In this case there are no constraints
  Board.find({}, function(err, boards) {
    if(err) {
      res.send(err);
    }
    res.json(boards);
  });
});


app.post('/boards', function(req, res) {
  // console.log(req.body.image)
  // console.log(req.body.text);
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

app.delete('/boards/:board_id', function(req, res) {
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


// ----------------------PINS ----------------------------

// app.param('board', function(req,res,next,id) {
//   var query = Board.findById(id);

//   query.exec(function(err, board) {
//     if(err) {
//       return next(err)
//     }
//     if(!board) {
//       return next(err)
//     }

//     req.board = board;
//     return next()
//   })
// })

app.get('/boards/:board_id', function(req, res) {
  console.log("GET REQ params")
  var board_id = req.params.board_id;
  

  Board.find({_id: board_id}, function(err, board) {
    if(err) {
      res.send(err)
    }
    var pinIds = board[0].pins;
    var linkArr = [];


      for(var i = 0; i < pinIds.length; i++) {
        Pin.find({_id: pinIds[i]}, function(err, pin) {
          if(err) {res.send(err)};
          var link = pin[0].link;
          linkArr.push(link);
          console.log(pin[0].link);
          console.log(linkArr);
          
          if(linkArr.length === pinIds.length) {
            res.send(linkArr);
          }
        })
        
      }
      

      
      
    
  })
  
});

app.post('/boards/:board_id', function(req, res){
  console.log("PIN REQ.BODY")
  console.log(req.body.data); //link
  var board_id = req.params.board_id; //board_id

  Pin.create({
    link: req.body.data,
    board: board_id
  }, function(err, pin){
    if(err) {res.send(err)}

    Board.findById(board_id, function(err, board) {
      if(err) {res.send(err);}
      board.pins.push(pin);
      board.save();
      console.log(board.pins)
    });

    Pin.find({link: req.body.data}, function(err, pin) {
      if(err) {
        res.send(err);
      }
      res.send(pin[0]);
    })



  })



});

//   var pin = new Pin(req.body);
//   pin.post = req.post;

//   pin.save(function(err, pin){
//     if(err) {return next(err)}

//     req.post.pins.push(pin);
//     req.post.save(function(err, pin) {
//       if(err) {return next(err)}
//       res.json(pin);
//     });
//   });

// })

// app.get('/boards/:board', function(req,res,next){
//   req.post.populate('pins', function(err, board){
//     if(err){return next(err)}
//       res.json(board);
//   })
// })


// app.get('/pins', function(req,res) {
//   //Find each board that matches the specified constraints of this model. In this case there are no constraints
//   Board.find({_id: req.params.board_id}, function(err, pin) {
//     if(err) {
//       res.send(err);
//     }
//     res.json(pin.pins);
//     console.log("pins: " + pin.pins)
//   });
// });


// app.delete('/pins/:pin_id', function(req, res) {
//   console.log("i hit server delete")
//   console.log(req.params)

//   Pin.remove({_id: req.params.pin_id}, function(err, pin) {
//     if(err) {
//       res.send(err)
//     }

//     Pin.find({}, function(err, pins) {
//       if(err) {
//         res.send(err)
//       }
//       res.send(pins);
//     })

//   })

// })




//when the server recevies a get request for '/' endpoint
// app.get('*', function(req, res) {
//     res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });



app.listen(8000);
console.log("App listening on port 8000");

