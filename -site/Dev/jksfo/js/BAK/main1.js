/* main1.js */

  // create the module and name it jksfoApp
  var jksfoApp = angular.module('jksfoApp', ['ngRoute']);

  // create the controller and inject Angular's $scope
  jksfoApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.content = 'Everyone come and see how good she looks!';
   })

  // configure our routes
  jksfoApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
   .when('/', {
      templateUrl : 'partials/home.html',
      controller  : 'mainController'
    })
    // route for the about page
    .when('/about', {
      templateUrl : 'partials/about.html',
      controller  : 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
      templateUrl : 'partials/contact.html',
      controller  : 'contactController'
    });
  });

  // create the controller and inject Angular's $scope
    
  jksfoApp.controller('mainController', function($scope) {
    // create a message to display in our view
    // $scope.message = 'Yummy, I am home!';
  });

   
  jksfoApp.controller('aboutController', function($scope) {
    //$scope.message = 'Look! I am an about page.';
  });

  jksfoApp.controller('contactController', function($scope) {
    $scope.content = 'Contact us! JK. This is just a demo.';
  });
   
  
  function here() {
    alert('here we are');
  }
  
   