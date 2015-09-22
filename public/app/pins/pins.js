angular.module('vidnight.pins', [])

.controller('pinsController', function($scope, $routeParams, $http, BoardsFactory) {

  $scope.input = {};
  $scope.pins;
  $scope.boards = BoardsFactory.boards[$routeParams.id];
  $scope.boardId = $routeParams.boardId;

  // $scope = {
  //   boards: []
  //   input: ""
  //   pins: 
  // }

  // boards = [
  // {title: $scope.input.text,
  //   image: $scope.input.image,
  //   pins: [
  //     {link: "www.youtube.com", description: "hello i love this video"},
  //     {link: "www.amazon.com", description: "hello i love amazon"}
  //   ]}
  // ]

  
  $scope.getPins = function() {
    $http.get('/boards/'+ $scope.boardId)
    .success(function(data){
      console.log("getting pins")
      console.log(data)
      $scope.pins = data;
    })
    .error(function(data){
      console.log("Error: " + data);
    });
  };

  $scope.getPins();

  
  $scope.addPin = function(){
    console.log("PIN INPUT");
    console.log($scope.input.text);
    $http({
      method: 'POST',
      url: '/boards/'+$scope.boardId,
      data: {data: $scope.input.text}
    })
    // $http.post('/boards/'+$scope.boardId, $scope.input.text)
    .success(function(data) {
      console.log("success")
      $scope.input = ""; //empties the input field
      // $scope.pins = data; //
      $scope.getPins(); //retreives all pins so the newest one is rendered too.
      console.log("Success: " + data);
    })
    .error(function(data){
      console.log("Error: " + data);
    })

  };

  // $scope.removePin = function(id){
  //   // console.log("i hit client delete")
  //   $http.delete('/pins/' + id)
  //   .success(function(data){
  //     // $scope.pins = data;
  //     $scope.getPins();
  //   })
  //   .error(function(data){
  //     console.log('Error: '+data);
  //   })
  // }

});
