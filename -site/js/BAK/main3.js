
  var jksfoApp = angular.module('jksfoApp', ['ngRoute']);

	jksfoApp.config( ['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/about', {
					templateUrl: 'partials/about.html'
				})
				.when('/other', {
					templateUrl: 'partials/other.html'
				})
				.when('/home', {
					templateUrl: 'partials/home.html'
				})
				.otherwise({
					redirectTo: '/home'
				});
		
		}]);	
