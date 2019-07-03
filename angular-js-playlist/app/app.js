var myNinjaApp = angular.module('myNinjaApp', []);

// 컨트롤러의 이름 뒤에 Controller라고 짓는거는 컨벤션 
myNinjaApp.controller('NinjaController', function($scope) {

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
 
  $scope.ninjas = [
    {
      name: "yoshi",
      belt: "green",
      rate: 50,
      available: true,
      thumb: "content/img/yoshi.png"
    },
    {
      name: "crystal",
      belt: "yellow",
      rate: 30,
      available: true,
      thumb: "content/img/crystal.png" 
    },
    {
      name: "Ryu",
      belt: "orange",
      rate: 10,
      available: false,
      thumb: "content/img/ryu.png"
    },
    {
      name: "shaun",
      belt: "black",
      rate: 1000,
      available: true,
      thumb: "content/img/shaun.png"
    }
  ];
});

