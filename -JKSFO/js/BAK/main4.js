
  // var jksfoApp = angular.module('jksfoApp', ['ngRoute'], ['mgcrea.ngStrap'], ['mgcrea.ngStrap.tooltip']);
  var jksfoApp = angular.module('jksfoApp', ['ngRoute', 'mgcrea.ngStrap']);

  //var jksfoApp = angular.module('jksfoApp', ['ngRoute', 'ui.bootstrap']);

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
		
		}]

		
		);	

		function DropdownCtrl($scope) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
}