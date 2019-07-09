# AngularJS Tutorial by The Net Ninja

## Index
- [1. 앵귤러JS에 대해](#1)
- [2. MVS 구조](#2)
- [3. 데이터 바인딩](#3)
- [4. 디렉티브](#4)
- [5. 표현식](#5)
- [6. ne-repeat](#6)
- [7. 모듈](#7)
- [8. 컨트롤러](#8)
- [9. 필터](#9)
- [10. ng-include](#10)
- [11. ng-show & ng-hide](#11)
- [12. ng-click](#12)
- [13. ng-submit](#13)
- [14. ng-src](#14)
- [15. 앵귤러JS 라우터](#15)
- [16. JSON 데이터와 $http](#16)
- [17. 커스텀 directives](#17)
- [18. Transclude와 Replace](#18)
- [19. 앵귤러JS 애니메이션 1](#19)
- [20. 앵귤러JS 애니메이션 2](#20)
- [21. 앵귤러JS 폼 유효성 검사 1](#21)
- [22. 앵귤러JS 폼 유효성 검사 2](#22)
- [23. 앵귤러JS location](#23)
- [24. URL 정상화](#24)

<h2 name="1">1. Introduction to AngularJS</h2>

- What is AngularJS?
  - MVC style JavaScript framework for creating single page apps.
  - Write our code in the way AngularJS wants us to, so we can use it's features in our projects.
- Features
  - 2 way data binding
  - templating
  - DOM interaction
  - filters
  - directives
  - many more...
- Single Page Apps
  - AngularJS primarily used to make single page, data driven applications.
  - Additional content brought into the web page without the need to refresh.
  - Use 'views'(the Vin MVC) to achieve this.

<h2 name="2">2. MVC Architecture</h2>

- Model
  - Think of the model as data
  - JSON, database data etc
- View
  - Used to display content & data to a user in a browser
  - HTML
  - Use expressions to insert data into views
    ```js
    <html tag>{{ data }}</html tag>
    ```
- Controller
  - Control the functionality of our views
  - Performs the interaction between our models and our views
  - Different controllers for different areas in our application
- Example
  - User clicks a 'show users' button in a view
  - The 'UserController' recognises the button click event and performs a function
  - The function communicates with the 'users' model and retrieves all the user data
  - The controller passes accessibility to this data to the view, which then displays it to the end user via expressions

<h2 name="3">3. 2 Way Data Binding</h2>

- Example of 2 way data binding
  ```html
  <!DOCTYPE html>
  <html lang="en" ng-app>
    <head>
      <title>TheNetNinja Angular Playlist</title>
      <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
    </head>
    <body>
      <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
      <p>Your fave meat is: {{favMeat}}</p>
    </body>
  </html>
  ```
- 유저가 input에 입력한 데이터(model)이 ng-model의 favMeat에 저장이 되고 favMeat은 {{}}을 통해 데이터를 유저에게 보여준다(view).

<h2 name="4">4. Directives</h2>

- 방금전에 사용한 ng-app이나 ng-model을 directives라고 한다. 
- https://docs.angularjs.org/api/ng/directive/ngClassOdd
- 또한 유저가 directive를 직접 만들 수 있다.

<h2 name="5">5. Expressions</h2>

- {{}}을 표현식으로 사용할 수 있다.
- ng-init은 어플리케이션이 로드될 때 초기화 시킴 
  ```html
  <body ng-init="meats=['pork', 'ham', 'beef']">
    <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
    <p>You like {{meats[1]}}, and you also like {{meats[2]}}</p> // You like ham, and you also like beef
  </body>
  ```
  ```html
   <body ng-init="color='orange'">
    <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
    <p class="{{color}}">hello dudes</p>  // css 정의에 의해 오렌지 색깔의 hello dudes가 출력 
  </body>
  ```

<h2 name="6">6. ng-repeat directive</h2>

- ng-repeat은 리스트의 내용들을 화면에 보여줄때 사용된다.
  ```html
   <body ng-init="ninjas=['yoshi', 'crystal', 'ryu', 'shaun']">
      <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
      <ul>
        <li ng-repeat="ninja in ninjas">{{ninja}}</li>
      </ul>
  </body>
  ```

<h2 name="7">7. Modules</h2>

- 모듈을 작성할 파일을 만들자
  ```js
  // app/app.js
  // 컨트롤러는 이 파일에 작성

  // angular.module('myNinjaApp', [])은 모든 코드를 담고있다. 
  var myNinjaApp = angular.module('myNinjaApp', []);

  // .config는 어플리케이션이 작동되기 전 실행된다
  myNinjaApp.config(function() {

  });

  // .run은 어플리케이션이 작동할때 실행된다
  myNinjaApp.run(function() {

  });

  myNinjaApp.controller
  ```
  ```html
  // html 파일은 ng-app="myNinjaApp"을 통해 컨트롤러가 제어한다 (참고로 myNinjaApp은 모듈의 첫번째 인수)
  <html lang="en" ng-app="myNinjaApp">
    <head>
      <title>TheNetNinja Angular Playlist</title>
      <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
      <script src="app/app.js"></script> // 연결해주기!
    </head>
    <body ng-init="ninjas=['yoshi', 'crystal', 'ryu', 'shaun']">
      <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
      <ul>
        <li ng-repeat="ninja in ninjas">{{ninja}}</li>
      </ul>
    </body>
  </html>
  ```

<h2 name="8">8. Controllers</h2>

  ```js
  var myNinjaApp = angular.module('myNinjaApp', []);

  // 컨트롤러의 이름 뒤에 Controller라고 짓는거는 컨벤션 
  myNinjaApp.controller('NinjaController', function($scope) {
    // NinjaController를 이용해 컨트롤한다. 
    $scope.message = "hey y'all";

    $scope.ninjas = ['yoshi', 'crystal', 'ryu', 'shaun'];
  });
  ```
  ```html
  <html lang="en" ng-app="myNinjaApp">
    <head>
      <title>TheNetNinja Angular Playlist</title>
      <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
      <script src="app/app.js"></script>
    </head>
    <body>
      <div ng-controller="NinjaController">
        <p>{{message}}</p> // hey y'all
        <ul>
          <li ng-repeat="ninja in ninjas">{{ninja}}</li>
        </ul>
      </div> 
    </body>
  </html>
  ```

<h2 name="9">9. Filters</h2>

- 앵귤러JS에서 필터는 |으로 구분하며 여러개의 |를 사용할 수 있다.
  ```js
  myNinjaApp.controller('NinjaController', function($scope) {
 
    $scope.ninjas = [
      {
        name: "yoshi",
        belt: "green",
        rate: 50
      },
      {
        name: "crystal",
        belt: "yellow",
        rate: 30
      },
      {
        name: "Ryu",
        belt: "orange",
        rate: 10
      },
      {
        name: "shaun",
        belt: "black",
        rate: 1000
      }
    ];
  });
  ```
  ```html
   <body>
    <div ng-controller="NinjaController">
      <input type="text" ng-model="search" />
      <ul>
        <li ng-repeat="ninja in ninjas | orderBy: 'name' | filter: search">
          {{ninja.name}} - {{ninja.rate | currency: '$'}}
        </li>
      </ul>
    </div> 
  </body>
  ```
- 문서에서 더 많은 필터를 확인 할 수 있다.

<h2 name="10">10. ng-include</h2>

- 헤더나 푸터처럼 고정되어있는 메뉴를 만들때 ng-include를 사용한다.

  ```html
  // header.html
  <div id="menu-bar">
    <h1>Ninja Directory</h1>
    <ul>
      <li><a href="">Home</a></li>
      <li><a href="">List Ninjas</a></li>
    </ul>
  </div>
  ```
  ```html
  // index.html
    <body>
      <header ng-include="'./header.html'"></header>  
      <div ng-controller="NinjaController">
        <input type="text" ng-model="search" />
        <ul>
          <li ng-repeat="ninja in ninjas | orderBy: 'name' | filter: search">
            {{ninja.name}} - {{ninja.rate | currency: '$'}}
          </li>
        </ul>
      </div> 
    </body>
  ```

<h2 name="11">11. ng-show & ng-hide</h2>

- 닌자 리스트중에서 available이 true인 닌자만 보여주고 싶다. 
- ng-show를 이용해서 나타낼 수 있다. 
  ```js
  myNinjaApp.controller('NinjaController', function($scope) {
 
    $scope.ninjas = [
      {
        name: "yoshi",
        belt: "green",
        rate: 50,
        available: true
      },
      {
        name: "crystal",
        belt: "yellow",
        rate: 30,
        available: true
      },
      {
        name: "Ryu",
        belt: "orange",
        rate: 10,
        available: false
      },
      {
        name: "shaun",
        belt: "black",
        rate: 1000,
        available: true
      }
    ];
  });
  ```
  ```html
   <body>
    <header ng-include="'./header.html'"></header>
    <div class="content">
      <div ng-controller="NinjaController">
        <input type="text" ng-model="search" placeholder="Search for a ninja"/>
        <ul>
          <li ng-repeat="ninja in ninjas | orderBy: 'name' | filter: search" ng-show="ninja.available"> // available이 true인 객체만 보여준다
            {{ninja.name}} - {{ninja.rate | currency: '$'}}
          </li>
        </ul>
      </div> 
    </div>  
  </body>
  ```
- ng-hide로 반대인 경우를 보여줄 수 있다. 

<h2 name="12">12. ng-click directive</h2>

- ng-click을 이용해 버튼의 클릭 이벤트를 구현가능 
- ng-click을 이용해서 order의 순서에 맞게 정리해주는 버튼을 만들어보자
  ```html
  // index.html
  <header ng-include="'./header.html'"></header>
    <div class="content">
      <div ng-controller="NinjaController">
        <button ng-click="order = 'name'">Order by Name</button>
        <button ng-click="order = 'belt'">Order by Belt</button>
        <input type="text" ng-model="search" placeholder="Search for a ninja"/>
        <ul>
          <li ng-repeat="ninja in ninjas | orderBy: order | filter: search" ng-show="ninja.available">
            <h3>{{ninja.name}} - {{ninja.rate | currency: '$'}}</h3>
            <div class="remove" ng-click="removeNinja(ninja)">x</div>
            <span class="belt" style="background: {{ninja.belt}}">{{ninja.belt}} belt</span>
          </li>
        </ul>
      </div> 
    </div>  
  ```
  ```js
  // app.js
  myNinjaApp.controller('NinjaController', function($scope) {

    $scope.removeNinja = function(ninja) {
      var removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1)
    }

    $scope.ninjas = [
      {
        name: "yoshi",
        belt: "green",
        rate: 50,
        available: true
      },
      {
        name: "crystal",
        belt: "yellow",
        rate: 30,
        available: true
      },
      {
        name: "Ryu",
        belt: "orange",
        rate: 10,
        available: false
      },
      {
        name: "shaun",
        belt: "black",
        rate: 1000,
        available: true
      }
    ];
  });
  ```
- x 버튼을 클릭하면 리스트에서 없어진다. 

<h2 name="13">13. ng-submit directive</h2>

- 닌자를 추가해보자 
  ```js
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
        available: true
      },
      {
        name: "crystal",
        belt: "yellow",
        rate: 30,
        available: true
      },
      {
        name: "Ryu",
        belt: "orange",
        rate: 10,
        available: false
      },
      {
        name: "shaun",
        belt: "black",
        rate: 1000,
        available: true
      }
    ];
  });
  ```
  ```html
  <body>
    <header ng-include="'./header.html'"></header>
    <div class="content">
      <div ng-controller="NinjaController">
        <button ng-click="order = 'name'">Order by Name</button>
        <button ng-click="order = 'belt'">Order by Belt</button>
        <input type="text" ng-model="search" placeholder="Search for a ninja"/>
        <ul>
          <li ng-repeat="ninja in ninjas | orderBy: order | filter: search" ng-show="ninja.available">
            <h3>{{ninja.name}} - {{ninja.rate | currency: '$'}}</h3>
            <div class="remove" ng-click="removeNinja(ninja)">x</div>
            <span class="belt" style="background: {{ninja.belt}}">{{ninja.belt}} belt</span>
          </li>
        </ul>
        <form ng-submit="addNinja()">
          <input type="text" placeholder="name" ng-model="newninja.name" />
          <input type="text" placeholder="belt" ng-model="newninja.belt" />
          <input type="text" placeholder="rate" ng-model="newninja.rate" />
          <input type="submit" value="Add new ninja" />
        </form>
      </div> 
    </div>  
  </body>
  ```

<h2 name="14">14. ng-src</h2>

- 각 리스트에 작은 썸네일 이미지를 추가해보자 
  ```js
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
  ```
  ```html
    <body>
      <header ng-include="'./header.html'"></header>
      <div class="content">
        <div ng-controller="NinjaController">
          <button ng-click="order = 'name'">Order by Name</button>
          <button ng-click="order = 'belt'">Order by Belt</button>
          <input type="text" ng-model="search" placeholder="Search for a ninja"/>
          <ul>
            <li ng-repeat="ninja in ninjas | orderBy: order | filter: search" ng-show="ninja.available">
              <img ng-src="{{ninja.thumb}}" alt="thumbnail-image" style="margin: -12px 10px 0 0; float: left; width: 50px;" ng-show="ninja.thumb" />
              <h3>{{ninja.name}} - {{ninja.rate | currency: '$'}}</h3>
              <div class="remove" ng-click="removeNinja(ninja)">x</div>
              <span class="belt" style="background: {{ninja.belt}}">{{ninja.belt}} belt</span>
            </li>
          </ul>
          <form ng-submit="addNinja()">
            <input type="text" placeholder="name" ng-model="newninja.name" />
            <input type="text" placeholder="belt" ng-model="newninja.belt" />
            <input type="text" placeholder="rate" ng-model="newninja.rate" />
            <input type="submit" value="Add new ninja" />
          </form>
        </div> 
      </div>  
    </body>
  ```
- 앵귤러JS에서 src가 아닌 ng-src를 쓰는 이유는 앵귤러JS가 이미지를 주입하기 전에 브라우저가 이미지를 찾기 때문에 에러가 나기 때문

<h2 name="15">15. Views and Routes</h2>

- 앵귤러JS에서 ng-view를 이용해 라우트 만들어주기 
- index.html에서 기존의 리스트부분을 지우고 main 태그안에서 ng-view를 설정
  ```html
  <html lang="en" ng-app="myNinjaApp">
    <head>
      <title>TheNetNinja Angular Playlist</title>
      <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
      <script src="https://code.angularjs.org/1.7.8/angular-route.min.js"></script>
      <script src="app/app.js"></script>
    </head>
    <body>
      <header ng-include="'./header.html'"></header>
      <main ng-view></main>
    </body>
  </html>
  ```
- 새로운 폴더와 파일 만들어주기
  ```html
  // views/home.html

  <h1>Homepage</h1>
  ```
  ```html
  // views/directory.html

  // directory.html에서 index.html에서 잘라낸 부분 붙여넣기
  <div class="content">
    <button ng-click="order = 'name'">Order by Name</button>
    <button ng-click="order = 'belt'">Order by Belt</button>
    <input type="text" ng-model="search" placeholder="Search for a ninja"/>
    <ul>
      <li ng-repeat="ninja in ninjas | orderBy: order | filter: search" ng-show="ninja.available">
        <img ng-src="{{ninja.thumb}}" alt="thumbnail-image" style="margin: -12px 10px 0 0; float: left; width: 50px;" ng-show="ninja.thumb" />
        <h3>{{ninja.name}} - {{ninja.rate | currency: '$'}}</h3>
        <div class="remove" ng-click="removeNinja(ninja)">x</div>
        <span class="belt" style="background: {{ninja.belt}}">{{ninja.belt}} belt</span>
      </li>
    </ul>
    <form ng-submit="addNinja()">
      <input type="text" placeholder="name" ng-model="newninja.name" />
      <input type="text" placeholder="belt" ng-model="newninja.belt" />
      <input type="text" placeholder="rate" ng-model="newninja.rate" />
      <input type="submit" value="Add new ninja" />
    </form>
  </div>  
  ```
- app.js에서 라우트 설정
  ```js
  // [] is for dependency injection
  // ngRoute는 앵귤러JS browser additional module에서 다운받은 라우트
  var myNinjaApp = angular.module('myNinjaApp', ['ngRoute']);

  // myNinjaApp에서 라우트 설정
  myNinjaApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
      // templateUrl은 /home 라우트에 대한 view 설정 
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/directory', {
        templateUrl: 'views/directory.html',
        // directory.html의 컨트롤러를 지정했으므로 해당 html파일에서 ng-controller는 필요없다
        controller: 'NinjaController'
      })
      // 라우트가 존재하지 않을경우 
      .otherwise({
        redirectTo: '/home'
      });
  }]);
  ```

<h2 name="16">16. JSON and $http</h2>

- 리스트들을 로컬이 아닌 JSON 데이터로 만들어 http 요청으로 데이터 가져오기 
- app.js에 있는 데이터를 JSON 형태로 만들기
- data라는 폴더안에 ninjas.json 파일을 생성한 뒤 json으로 만든 데이터 넣어주기
  ```json
  // data/ninjas.json
  [
    {
      "name": "yoshi",
      "belt": "green",
      "rate": 50,
      "available": true,
      "thumb": "content/img/yoshi.png"
    },
    {
      "name": "crystal",
      "belt": "yellow",
      "rate": 30,
      "available": true,
      "thumb": "content/img/crystal.png" 
    },
    {
      "name": "Ryu",
      "belt": "orange",
      "rate": 10,
      "available": false,
      "thumb": "content/img/ryu.png"
    },
    {
      "name": "shaun",
      "belt": "black",
      "rate": 1000,
      "available": true,
      "thumb": "content/img/shaun.png"
    }
  ]
  ```
- $http를 이용해서 서비스에 필요한 api 가져오기 
  ```js
  // app/app.js
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

    // 강의에서는 .success를 사용했으나 앵귤러JS 1.6버전부터 then을 사용
    $http.get('data/ninjas.json').then(function(res) {
      $scope.ninjas = res.data
    })
  }]);
  ```

<h2 name="17">17. Custom Directives</h2>

- 커스텀 directives 만들어보기
- http://127.0.0.1:5500/#!/home 메인화면에 리스트에 있는 이름 무작위로 보여주기
- 그렇게 하기 위해서는 /home 라우터에 NinjaController 컨트롤러 연결시켜주기
  ```js
  // app/app.js
  myNinjaApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
      // templateUrl은 /home 라우트에 대한 view 설정 
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'NinjaController'
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
  ```
  ```html
  // views/home.html
  <div class="content">
    <h1 style="text-align: center;">Homepage</h1>
    <random-ninja ninjas="ninjas" title="'Random Ninja'"></random-ninja>
  </div>
  ```
  ```js
  // app/app.js
  // randomNinja는 home.html의 태그 이름과 같게 만들기 (단, 케밥 -> camelCase로)
  myNinjaApp.directive('randomNinja', [function(){
    return {
      // restrict 프로퍼티에서 directive가 어떻게 사용될지 설정하며
      // A, E, C, M을 값으로 사용할 수 있다
      // E는 Element, A는 Attribute 둘 다 사용하고 싶으면 EA
      restrict: 'E',
      // 해당 directive가 속해있는 controller scope객체에서 데이터를 여기 scope에 맵핑한다
      scope: {
        // random-ninja 태그안에서 같은 directive를 찾아서 데이터를 바인딩함 
        ninjas: '=',
        title: '='
      },
      // 해당 directive안의 템플릿이 정의된 파일경로 
      templateUrl: 'views/random.html',
      controller: function($scope){
        // 무작위 숫자 생성
        $scope.random = Math.floor(Math.random() * 4);
      }
    };
  }]);
  ```
  ```html
  // views/random.html
  <div style="text-align: center">
    <h4>{{title}}</h4>
    <h3>{{ninjas[random].name}}</h3>
  </div>
  ```

<h2 name="18">18. Transclude & Replace</h2>

- home.html에서 생성한 메인 템플릿에서 random-ninja태그 사이에 또 다른 태그를 넣어도 화면에 출력되지 않는다.
  ```html
  <div class="content">
    <h1 style="text-align: center;">Homepage</h1>
    <random-ninja ninjas="ninjas" title="'Random Ninja'">
      <p>Check out our random ninja</p>
    </random-ninja>
  </div>
  ```
- random-ninja 태그 사이에 넣은 태그를 화면에 그려주기 위해서 transclude 설정을 사용한다.  
  ```js
  yNinjaApp.directive('randomNinja', [function(){
    return {
      restrict: 'E',
      scope: {
        ninjas: '=',
        title: '='
      },
      templateUrl: 'views/random.html',
      transclude: true,
      controller: function($scope){
        $scope.random = Math.floor(Math.random() * 4);
      }
    };
  }]);
  ```
- 하지만 앵귤러JS는 해당 템플릿을 어디서 보여줘야 할지 모르기 때문에 아직 화면에 나오지 않는다. 앵귤러JS에게 위치를 알려주기 위해서는 ng-transclude를 사용한다. 
  ```html
  <div style="text-align: center">
    <h4>{{title}}</h4>
    <div ng-transclude></div>
    <h3>{{ninjas[random].name}}</h3>
  </div>
  ```
- 만약 커스텀된 태그를 html 지정태그로 바꾸고싶다면 (예를들어 random-ninja 태그를 div 태그로) replace를 사용한다. 
  ```js
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
  ```
- 개발자도구에서 Element 탭을보면 random-ninja태그가 div 태그로 바뀐것을 확인 가능

<h2 name="19">19. Animations 1</h2>

- 앵귤러JS additional module로 animate.min.js 받기
  ```html
  // index.html
  <head>
    <title>TheNetNinja Angular Playlist</title>
    <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.7.8/angular-route.min.js"></script>
    <script src="https://code.angularjs.org/1.7.8/angular-animate.min.js"></script>
    <script src="app/app.js"></script>
  </head>
  ```
- app.js에서 모듈에 ngAnimate를 추가
  ```js
  var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);
  ```
- animation 종류는 https://docs.angularjs.org/api/ngAnimate 참조
- 해당 코드를 CSS에 추가
  ```css
  /* The starting CSS styles for the enter animation */
  .fade.ng-enter {
    transition:0.5s linear all;
    opacity:0;
  }

  /* The finishing CSS styles for the enter animation */
  .fade.ng-enter.ng-enter-active {
    opacity:1;
  }
  ```
- index.html의 main 태그에 css를 맞춰준다.
  ```css
  /* The starting CSS styles for the enter animation */
  main.ng-enter {
    transition: 0.5s linear all;
    opacity: 0;
  }

  /* The finishing CSS styles for the enter animation */
  main.ng-enter.ng-enter-active {
    opacity: 1;
  }
  ```
- 페이지 변환뿐만 아니라 리스트를 추가하고 삭제할때 애니메이션 효과를 사용할 수 있다.
  ```css
  #ninja-list li.ng-enter {
  transition: 0.2s linear all;
  opacity: 0;
  transform: translateY(30px);
  }

  #ninja-list li.ng-enter.ng-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  #ninja-list li.ng-leave {
    transition: 0.2s linear all;
    opacity: 1;
    transform: translateX(0)
  }

  #ninja-list li.ng-leave.ng-leave-active {
    opacity: 0;
    transform: translateX(-100%);
  }
  ```

<h2 name="20">20. Animations 2</h2>

- 전체 리스트 삭제할때 stagger 효과주기 
  ```css
  #ninja-list li.ng-leave.ng-leave-active {
    opacity: 0;
    transform: translateX(-100%);
  }

  #ninja-list li.ng-leave-stagger{
    transition-delay: .2s;
    transition-duration: 0;
  }
  ```

<h2 name="21">21. Form Validation 1</h2>

- views 폴더에 contact.html 파일 생성 및 작성
  ```html
  <div class="contact">
    <form name="contactForm" novalidate>
      <input type="text" placeholder="name" name="name" />
      <input type="email" placeholder="Email" name="email" />
      <textarea placeholder="Your Message" name="message"></textarea>
      <input type="submit" value="Send" />
    </form>
  </div>
  ```
- 위쪽 코드에서 novalidate은 html대신 앵귤러JS가 폼 유효성을 체크하게 만들어준다. 
- routeProvider에 contact 라우터 추가
  ```js
  myNinjaApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
      // templateUrl은 /home 라우트에 대한 view 설정 
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'NinjaController'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
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
  ```
- 참고로 views안에 있는 파일의 이름과 이동하고 싶은 라우터의 이름이 같아야 페이지로 이동 
- Form Classes
  - ng-pristine : when form/input not used yet 
  - ng-dirty : when form/input has been used 
  - ng-untouched : when input has not been touched 
  - ng-touched : when input has been touched 
  - ng-valid : when a form field is valid 
  - ng-invalid : when a form field is not valid 
- 앵귤러JS에 맞게 폼 양식을 고쳐준다.
  ```html
  // contact.html
  <div class="content">
    <form name="contactForm" novalidate>
      <input type="text" placeholder="name" name="name" ng-model="contact.name" ng-required="true"/>
      <input type="email" placeholder="Email" name="email" ng-model="contact.email" ng-required="true"/>
      <textarea placeholder="Your Message" name="message" ng-model="contact.message" ng-required="true"></textarea>
      <input type="submit" value="Send" />
    </form>
  </div>
  ```
- 폼의 상태에 따라 form의 클래스들이 유동적으로 바뀐다.
- 이것을 이용해 폼이 invalid가 되었을 경우 border를 red로 만들어준다.
  ```css
  /* ng-touched가 없으면 기본 폼 border색이 red가 된다 */
  input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
    border: 2px solid red;
  }
  ```

<h2 name="22">22. Form Validation 2</h2>

- 앵귤러JS가 제공해주는 기능으로 폼 업그레이드 해주기 
- Form Properties
  - ng-pristine -> $pristine 
  - ng-dirty -> $dirty
  - ng-touched -> $touched
  - ng-valid -> $valid
  - ng-invalid -> $invalid
- 프로퍼티 체크해보기
  ```html
  // contact.html
  <div class="content">
    <form name="contactForm" novalidate>
      <input type="text" placeholder="name" name="name" ng-model="contact.name" ng-required="true"/>
      <span>
        $pristine - {{contactForm.name.$pristine}}, // true
        $dirty - {{contactForm.name.$dirty}}, // false
        $untouched - {{contactForm.name.$untouched}}, //true
        $touched - {{contactForm.name.$touched}}, // false
        $invalid - {{contactForm.name.$invalid}}, //true
        $valid - {{contactForm.name.$valid}} // false
      </span>
      <input type="email" placeholder="Email" name="email" ng-model="contact.email" ng-required="true"/>
      <textarea placeholder="Your Message" name="message" ng-model="contact.message" ng-required="true"></textarea>
      <input type="submit" value="Send" />
    </form>
  </div>
  ```
- 폼에 내용을 입력하거나 클릭했을 경우 프로퍼티들이 바뀐다. 
- 이 프로퍼티들의 특성을 이용해서 입력폼과 버튼의 유효성 설정을 만들어준다.
  ```html
  <div class="content">
    <form name="contactForm" novalidate>
      <input type="text" placeholder="name" name="name" ng-model="contact.name" ng-required="true"/>
      <div ng-show="contactForm.name.$touched && contactForm.name.$invalid">
        <small style="color: red; display: block; text-align: center;">Enter a valid name</small>
      </div>
      <input type="email" placeholder="Email" name="email" ng-model="contact.email" ng-required="true"/>
      <div ng-show="contactForm.email.$touched && contactForm.email.$invalid">
        <small style="color: red; display: block; text-align: center;">Enter a valid email</small>
      </div>
      <textarea placeholder="Your Message" name="message" ng-model="contact.message" ng-required="true"></textarea>
      <input type="submit" value="Send" ng-disabled="contactForm.$invalid" />
    </form>
  </div>
  ```
  ```css
  input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
    border: 2px solid red;
  }

  input[disabled="disabled"] {
    opacity: .4;
    cursor: not-allowed !important;
  }
  ```

<h2 name="23">23. Location Service</h2>

- Send 버튼 작동시키기 
- contact-success.html 파일 만들어주기
  ```html
  <div class="content">
    <h2>Thanks a bunch for getting in touch!</h2>
  </div>
  ```
- form에 ng-submit directive 추가
  ```html
  <div class="content">
    <form name="contactForm" ng-submit="sendMessage()" novalidate>
      <input type="text" placeholder="name" name="name" ng-model="contact.name" ng-required="true"/>
      <div ng-show="contactForm.name.$touched && contactForm.name.$invalid">
        <small style="color: red; display: block; text-align: center;">Enter a valid name</small>
      </div>
      <input type="email" placeholder="Email" name="email" ng-model="contact.email" ng-required="true"/>
      <div ng-show="contactForm.email.$touched && contactForm.email.$invalid">
        <small style="color: red; display: block; text-align: center;">Enter a valid email</small>
      </div>
      <textarea placeholder="Your Message" name="message" ng-model="contact.message" ng-required="true"></textarea>
      <input type="submit" value="Send" ng-disabled="contactForm.$invalid" />
    </form>
  </div>
  ```
- 하지만 현재 해당 view를 담당하는 컨트롤러가 없으며 sendMessage() 함수가 존재하지 않으므로 작동하지않는다. 
- routeProvider에서 /contact에 컨트롤러 설정해주기
  ```js
  // app.js

  myNinjaApp.config(['$routeProvider', function($routeProvider){

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

    myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
      $scope.sendMessage = function(){
        // 메인페이지로 연결 
        $location.path('contact-success');
      };
  }]);
  ```
- Submit 버튼을 누르면 페이지가 이동한다. 

<h2 name="24">24. Pretty URL's</h2>

- 현재 url 형식을 http://127.0.0.1:5500/#!/home에서 http://127.0.0.1:5500/home로 바꿔보자
- 먼저 app.js에서 locationProvider 설정해주기
  ```js
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
  ```
- index.html에서 base href 설정하기
  ```html
  <!DOCTYPE html>
  <html lang="en" ng-app="myNinjaApp">
    <head>
      <base href="/" />
      <title>TheNetNinja Angular Playlist</title>
      <link href="content/css/styles.css" rel="stylesheet" type="text/css" />
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
      <script src="https://code.angularjs.org/1.7.8/angular-route.min.js"></script>
      <script src="https://code.angularjs.org/1.7.8/angular-animate.min.js"></script>
      <script src="app/app.js"></script>
    </head>
    <body>
      <header ng-include="'./header.html'"></header>
      <main ng-view></main>
    </body>
  </html>
  ```
- header.html에서 #! 지워주기
  ```html
  <div id="menu-bar">
    <h1>Ninja Directory</h1>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/directory">List Ninjas</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
  ```
- #!가 없는 주소가 정상적으로 보여지나 직접 주소를 입력하면 Cannot GET /home 에러가 뜬다. 왜냐하면 앵귤러JS는 직접 입력한 주소를 핸들링 하지 않기 때문 
- 그런데 강의에서는 Wamp server를 이용하기 때문에 여기까지...