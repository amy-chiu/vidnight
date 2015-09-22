angular.module('vidnight.boards', [])

.controller('boardsController', function($scope, $http, BoardsFactory, $routeParams) {
  $scope.boards = [];
  // BoardsFactory.boards;
  $scope.input = {};

  // $scope = {
  //   boards: []
  //   input: {
  //     text: ""
  //     image: ""
  //   }

  // }

  // $scope.boards.push({
  //   title: $scope.input.text,
  //   image: $scope.input.image,
  //   pins: [
  //     {link: "www.youtube.com", description: "hello i love this video"},
  //     {link: "www.amazon.com", description: "hello i love amazon"}
  //   ]
  // })

  $scope.getBoards = function() {
    $http.get('/boards')
    .success(function(data){
      console.log("GET BOARDS DATA")
      console.log(data)
      $scope.boards = data;
      console.log("BOARDS")
      console.log($scope.boards);
      console.log("BOARD ID");
      console.log($scope.board_id);
      //need to make this data accessible by boards and pins controller;
    })
    .error(function(data){
      console.log("Error: " + data);
    });
  };

  $scope.getBoards();


  $scope.addBoard = function(){
    var title = $scope.input.text.replace(/ /g,'')

    $http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + title)
    .success(function(imageLink){
      
      $scope.input.image = imageLink.data.image_url;

      $http.post('/boards', $scope.input)
      .success(function(data) {
        $scope.input.text = ""; //empties the input field
        $scope.input.image = "";
        // $scope.boards = data; 
        $scope.getBoards(); //retreives all boards so the newest one is rendered too.
        console.log("Success: " + data);
      })

    }, function(err) {
        console.log("Error: " + data);
      })

    
  };

  $scope.removeBoard = function(id){
    // console.log("i hit client delete")
    $http.delete('/boards/' + id)
    .success(function(data){
      // $scope.boards = data;
      $scope.getBoards();
    })
    .error(function(data){
      console.log('Error: '+data);
    })
  }

});
