angular.module('vidnight', [
  'vidnight.services',
  'vidnight.boards',
  'vidnight.pins',
  'ngRoute'
])
.config(function($routeProvider){
  $routeProvider
  .when('/boards', {
    templateUrl: 'app/boards/boards.html',
    controller: 'boardsController'
  })
  .when('/boards/:boardId', {
    templateUrl: 'app/pins/pins.html',
    controller: 'pinsController'
  })
  .otherwise({
    redirectTo: '/boards'
  })

});


