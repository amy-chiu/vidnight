// angular.module('vidnight.pins', [])

// .controller('pinsController', function($scope, $http) {

//   $scope.input = {};

//   // $scope = {
//   //   input: {link: ""},
//   //   pins: [{pin}]
//   // }
//   $scope.getPins = function() {
//     $http.get('/pins/:board_id')
//     .success(function(data){
//       console.log(data)
//       $scope.pins = data;
//     })
//     .error(function(data){
//       console.log("Error: " + data);
//     });
//   };

//   $scope.getPins();

  // $scope.addPin = function(){
  //   $http.post('/pins', $scope.input)
  //   .success(function(data) {
  //     $scope.input.link = ""; //empties the input field
  //     // $scope.pins = data; //
  //     $scope.getPins(); //retreives all pins so the newest one is rendered too.
  //     console.log("Success: " + data);
  //   })
  //   .error(function(data){
  //     console.log("Error: " + data);
  //   })

  // };

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

// });
