// [] is for dependency injection
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
    // templateUrl은 /home 라우트에 대한 view 설정 
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      // directory.html의 컨트롤러를 지정했으므로 컨트롤러를 지정해주는 html의 ng-controller는 필요없다
      controller: 'NinjaController'
    })
    // 라우트가 존재하지 않을경우 
    .otherwise({
      redirectTo: '/home'
    });
}]);

myNinjaApp.directive('randomNinja', [function(){
  return {
    restrict: 'E',
    scope: {
      ninjas: '=',
      title: '='
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);

// 컨트롤러의 이름 뒤에 Controller라고 짓는거는 컨벤션 
myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1)
  };

  $scope.addNinja = function(){
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.belt = "";
    $scope.newninja.rate = "";
  };

  $scope.removeAll = function() {
    $scope.ninjas = [];
  }

  $http.get('data/ninjas.json').then(function(res) {
    $scope.ninjas = res.data
  })
}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    // contact-success 라우트에 연결 
    $location.path('/contact.success');
  };
}]);