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

<h2 name="1">Introduction to AngularJS</h2>

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

<h2 name="2">MVC Architecture</h2>

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

<h2 name="3">2 Way Data Binding</h2>

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

<h2 name="4">Directives</h2>

- 방금전에 사용한 ng-app이나 ng-model을 directives라고 한다. 
- https://docs.angularjs.org/api/ng/directive/ngClassOdd
- 또한 유저가 directive를 직접 만들 수 있다.

<h2 name="5">Expressions</h2>

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

<h2 name="6">ng-repeat directive</h2>

- ng-repeat은 리스트의 내용들을 화면에 보여줄때 사용된다.
  ```html
   <body ng-init="ninjas=['yoshi', 'crystal', 'ryu', 'shaun']">
      <input type="text" ng-model="favMeat" placeholder="enter you fav meat" />
      <ul>
        <li ng-repeat="ninja in ninjas">{{ninja}}</li>
      </ul>
    </body>
  ```

<h2 name="7">Modules</h2>

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
  // html 파일은 ng-app="myNinjaApp"을 통해 컨트롤러가 제어한다 (참고로 myNinjaApp은 변수의 이름이 아님)
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

<h2 name="8">Controllers</h2>

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

<h2 name="9">Filters</h2>

- AngularJS에서 필터는 |으로 구분하며 여러개의 |를 사용할 수 있다.
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

<h2 name="10">ng-include</h2>

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

<h2 name="11">ng-show & ng-hide</h2>

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

<h2 name="12">ng-click directive</h2>

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

<h2 name="13">ng-submit directive</h2>

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

<h2 name="14">ng-src</h2>

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
- AngularJS에서 src가 아닌 ng-src를 쓰는 이유는 앵귤러가 이미지를 주입하기 전에 브라우저가 이미지를 찾기 때문에 에러가 나기 때문