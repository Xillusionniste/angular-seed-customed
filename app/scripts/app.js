'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'TemplateController',
  'ngMaterial'
])
.config(['$routeProvider', '$locationProvider', 
	function($routeProvider,$locationProvider) {
  $routeProvider
  	.when('/home', {
  		templateUrl: 'app/partials/home.html'
  	})
  	.otherwise({redirectTo: '/home'});
}]);