angular.module('vidnight.boards', [])

.controller('boardsController', function($scope, $http) {
  console.log("hitting controller")
  $scope.input = {};

  // $scope = {
  //   input: {text: ""},
  //   boards: [{board}]
  // }
  $scope.getBoards = function() {
    $http.get('/boards')
    .success(function(data){
      console.log(data)
      $scope.boards = data;
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
