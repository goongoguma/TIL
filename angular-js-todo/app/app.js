var myTodoApp = angular.module('myTodoApp', ['ngRoute']);

myTodoApp.config(['$routeProvider', '$locationProvider', function($routeProvider){

  $routeProvider
    .when('/body', {
      templateUrl: 'views/body.html',
      controller: 'TodoController'
    })
    .otherwise({
      redirectTo: '/body'
    })
}])

myTodoApp.controller('TodoController', ['$scope', '$http', function($scope, $http) {

  $scope.removeTodo = function(todo) {
    var removeTodo = $scope.todos.indexOf(todo);
    $scope.todos.splice(removeTodo, 1);
  };

  $scope.addTodo = function() {
    $scope.todos.push({
      task: $scope.newTodo.task,
      done: false
    });

    $scope.newTodo.task = "";
  };

  $scope.removeAll = function() {
    $scope.todos = [];
  };

  $http.get('data/todos.json').then(function(res) {
    console.log(res)
    $scope.todos = res.data;
  })
}]);
