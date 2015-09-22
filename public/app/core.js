angular.module('vidnight', [
  'vidnight.boards',
  // 'vidnight.pins',
  'ngRoute'
])
.config(function($routeProvider){
  $routeProvider
  .when('/boards', {
    templateUrl: 'app/boards/boards.html',
    controller: 'boardsController'
  })
  // .when('/pins/{board_id}', {
  //   templateUrl: 'app/pins/pins.html',
  //   controller: 'pinsController'
  // })
  .otherwise({
    redirectTo: '/boards'
  })

});


