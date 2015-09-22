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
    $http.post('/boards', $scope.input)
    .success(function(data) {
      $scope.input.text = ""; //empties the input field
      // $scope.boards = data; //
      $scope.getBoards(); //retreives all boards so the newest one is rendered too.
      console.log("Success: " + data);
    })
    .error(function(data){
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
